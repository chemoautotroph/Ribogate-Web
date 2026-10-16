from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, RadioField, BooleanField, SelectMultipleField, HiddenField, widgets
from wtforms.validators import ValidationError, DataRequired
from markupsafe import Markup

from .TC.tri_cleaver_prep import extract_rzbss, count_triplets, example_wt_seq, example_mutant_seq
from WS import app
from .utility import convert_to_float

class TCSubmissionForm(FlaskForm):
    '''
    flask-WTF form object that handles TC job submission validation
    '''

    temperature_field = StringField(u'Temperature (°C)', default='37.0')
    wt_field = TextAreaField('Wild-type sequence', default=example_wt_seq)
    mutant_field  = TextAreaField('Mutant sequence', default=example_mutant_seq)
    #If I want to make part of choice italic, I just put the takes directly and mark ninja safe and it works
    target_environment = RadioField('Target environment', choices=[('in_vivo', '<i>In vivo</i>'), ('in_vitro', '<i>In vitro</i>')], default='in_vivo')
    #But making part of a label italic doesn't work for someone reason. However, using Markup (flask import Markup) works
    in_vitro_option = RadioField(Markup('<i>In vitro</i> options'), choices=[('ribozyme_only', 'Ribozyme only'), ('default_T7', "Default T7 promoter (5’ GAATTTAATACGACTCACTATA<u>G</u> 3’)"), ('custom_promoter', 'Custom promoter')])
    custom_promoter_text = StringField('Custom Promoter Text')
    in_vivo_option = RadioField(Markup('<i>In vivo</i> options'), choices=[('ribozyme_only', 'Ribozyme only'), ('alen', 'Special'), ('kharma', 'tRNA-SRz-CTE')], default='ribozyme_only')
    potential_cut_site_types = ['GUC', 'AUC', 'UUC', 'AUA', 'GUA', 'CUC', 'UUA', 'AUU', 'GUU', 'CUA', 'CUU', 'UUU'] #Hardcoding this here makes things much easier. The counts of each cut site are dynamically added after step 1 validation
    cut_sites_field = SelectMultipleField('Cut sites', choices=[(c, c) for c in potential_cut_site_types], default=potential_cut_site_types, option_widget=widgets.CheckboxInput()) #without widgets.CheckboxInput() no checkbxoes are rendered
    submit = SubmitField('Submit request')
    client_step = HiddenField()


    def validate_wt_mutant_seqs(self, extra_validators=None):  
        '''
        Validate the wild-type and mutant sequences
        '''

        if not self.wt_field.data:
            self.wt_field.errors.append('Please specify the sequence of the wild-type strand')
            return False
        else:
            self.wt_seq = self.wt_field.data.replace(' ','').replace('\n','').replace('a','A').replace('g','G').replace('c','C').replace('t','U').replace('T','U')

        if not self.mutant_field.data:
            self.mutant_field.errors.append('Please specify the sequence of the mutant strand')
            return False
        else:
            self.mutant_seq = self.mutant_field.data.replace(' ','').replace('\n','').replace('a','A').replace('g','G').replace('c','C').replace('t','U').replace('T','U')

        if self.wt_seq.count('-') != 2:
            self.wt_field.errors.append("The repeats region must be delineated by one dash on each side. e.g. AAAA-CAGCAGCAG-AAAA")
            return False
        else:
            self.upstream_wt, self.repeats_wt, self.downstream_wt = self.wt_seq.split('-')

        if self.mutant_seq.count('-') != 2:
            self.mutant_field.errors.append("The repeats region must be delineated by one dash on each side. e.g. AAAA-CAGCAGCAG-AAAA")
            return False
        else:
            self.upstream_mutant, self.repeats_mutant, self.downstream_mutant = self.mutant_seq.split('-')

        valid_chars = set("AUGTCaugtc-")
        if not set(self.wt_seq).issubset(valid_chars):
            self.wt_field.errors.append("Wild-type sequence contains invalid characters. Allowed characters are A, U, G, T, C, as well a dash (-) on each side of the repeats segment")
            return False
        if not set(self.mutant_seq).issubset(valid_chars):
            self.mutant_field.errors.append("Mutant sequence contains invalid characters. Allowed characters are A, U, G, T, C, as well a dash (-) on each side of the repeats segment")
            return False

        if self.upstream_wt != self.upstream_mutant:
            error_message = "The sequence of the region upstream of the repeats must be identical between the wild-type and mutant."
            self.mutant_field.errors.append(error_message)
            self.wt_field.errors.append(error_message)
            return False
        else:
            self.upstream_seq = self.upstream_wt

        if self.downstream_wt != self.downstream_mutant:
            error_message = "The sequence of the region downstream of the repeats must be identical between the wild-type and mutant."
            self.mutant_field.errors.append(error_message)
            self.wt_field.errors.append(error_message)
            return False
        else:
            self.downstream_seq = self.downstream_wt

        if (len(self.mutant_seq) - 3) < len(self.wt_seq): #This '3' will have to be replaced if we want to deal with repeats of size 4,5,6
            self.mutant_field.errors.append("The mutant must contain at least one more repeat than the wild-type.")
            self.wt_field.errors.append("The wild-type must contain at least one less repeat than the mutant.")
            return False

        return True

    def validate(self, extra_validators=None):
        '''
        Validates the TC job submission
        Job submission is a two step process
        In step one, the user species the wild-type and mutant sequences with the repeats marked
        During validation of this step, all possible cut sites are extracted. This is required for step two. This process makes things messy.
        If the sequence pass the first validation step, they can proceed in step two
        In step two, the user enters some more advanced options
        This function is messy and can hopefully be refactored.
        '''

        #First, call the original validate to run individual field validators
        #I'm not using this at all (I'm not using 'data required' and I'm clearing the choice errors), but it creates the errors fields so I can .append messages to them
        initial_validation = super(TCSubmissionForm, self).validate()

        #Clearing is only required if we performed the initial validation
        #If any of the radio buttons are left unchecked, an error will have occured.
        #So we clear any prior validation errors for in_vivo_option and in_vitro_option
        self.target_environment.errors.clear()
        self.in_vivo_option.errors.clear()
        self.in_vitro_option.errors.clear()
        self.cut_sites_field.errors.clear()

        self.step = int(self.client_step.data)
        print("Validation client step", self.step)
        if self.step == 1 or self.step == 2: #Always validate the first step, even if we are in step 2

            if not self.validate_wt_mutant_seqs():
                return False

            '''
            Determine the # of wt and mutant repeats
            '''
            bool_error = False
            triplet_wt, self.num_repeats_wt = count_triplets(self.repeats_wt)
            triplet_mutant, self.num_repeats_mutant = count_triplets(self.repeats_mutant)
            if triplet_wt != triplet_mutant:
                error_message = "The type of repeat (e.g. GCG, CAG) must be the same between the wild-type and mutant."
                self.mutant_field.errors.append(error_message)
                self.wt_field.errors.append(error_message)
                bool_error = True
            if self.num_repeats_wt >= self.num_repeats_mutant:
                error_message = "The number of mutant repeats must exceed the number of wild-type repeats."
                self.mutant_field.errors.append(error_message)
                bool_error = True
            if self.num_repeats_wt < 5:
                self.wt_field.errors.append("The wild type must have at least 5 repeats.")
                bool_error = True
            self.repeat_unit = triplet_wt
            if bool_error:
                return False

            '''
            In some cases (e.g. Hunts, MJD) there are a lot of mutant repeats relative to the wild-type. 
            In one sense this is good: the higher the ratio between them, the easier it is for the OBS to differentiate between them. 
            However, at some point there is overkill. The OBS will be very long which will grind folding to a halt without further increasing selectivitly. Therefore, we cap the OBS length.
            '''
            max_mutant_wt_difference = app.config['MAX_MUTANT_WT_DIFFERENCE']
            if self.num_repeats_mutant - self.num_repeats_wt > max_mutant_wt_difference:
                self.num_repeats_mutant = self.num_repeats_wt + max_mutant_wt_difference

            #Extract potential ribozyme binding sites (rzbs) and their associated cut sites
            rzbs_start_idxs, rzbs_cut_sites = extract_rzbss(self.downstream_seq, app.config['TEMPLATE_PARAMS']['S3_LEN'], app.config['TEMPLATE_PARAMS']['RZBS_LEN'], app.config['TEMPLATE_PARAMS']['RZBS_EXTENSION_LEN'])
            self.num_cut_sites = len(rzbs_cut_sites)
            if self.num_cut_sites == 0:
                self.cut_sites_field.errors.append("No potential cut sites detected. Unable to process request.")
                return False

            #Count the number of instances of each cut site type
            cut_site_counts = dict()
            for cut_site in self.potential_cut_site_types:
                cut_site_counts[cut_site] = 0
            for cut_site in rzbs_cut_sites:
                cut_site_counts[cut_site] += 1
            self.cut_sites_field.choices = [(x, f"{x} ({cut_site_counts[x]})") for x in cut_site_counts.keys()] #Add counts to the field label

        if self.step== 2:
            bool_error = False

            '''
            Validate environmental parameters
            '''
            if not self.target_environment.data:
                self.target_environment.errors.append('Please select a target environment.')
                bool_error = True
            else:
                if self.target_environment.data == 'in_vivo':
                    if not self.in_vivo_option.data:  # Check if in_vivo_option is empty
                        self.in_vivo_option.errors.append('Please select an option for In Vivo.')
                        bool_error = True
                    else:
                        self.environment = self.target_environment.data + '_' + self.in_vivo_option.data

                elif self.target_environment.data == 'in_vitro':
                    if not self.in_vitro_option.data:  # Check if in_vitro_option is empty
                        self.in_vitro_option.errors.append('Please select an option for In Vitro.')
                        bool_error = True
                    else:
                        self.environment = self.target_environment.data + '_' + self.in_vitro_option.data
                        if self.in_vitro_option.data == "custom_promoter":
                            valid_chars = set("AUGTCaugtc-")
                            custom_promoter_seq = self.custom_promoter_text.data.replace(" ", "")
                            if len(custom_promoter_seq) == 0:
                                self.in_vitro_option.errors.append("Please provide a sequence for your custom promoter")
                                bool_error = True
                            if not set(self.custom_promoter_text.data).issubset(valid_chars):
                                self.in_vitro_option.errors.append("Custom promoter contains invalid characters. Allowed characters are A, U, G, T, C")
                                bool_error = True
                            else:
                                self.environment += '_' + custom_promoter_seq

            '''
            Validate selected cut sites
            '''
            if not self.cut_sites_field.data:
                self.cut_sites_field.errors.append('Please select at least one cut site type')
                bool_error = True
            else:
                self.allowed_cut_site_types = self.cut_sites_field.data
                self.allowed_rzbs_start_idxs = []
                for (start_idx, cut_site) in zip(rzbs_start_idxs, rzbs_cut_sites):
                    if cut_site in self.allowed_cut_site_types:
                        self.allowed_rzbs_start_idxs.append(start_idx)
                if len(self.allowed_rzbs_start_idxs) == 0:
                    self.cut_sites_field.errors.append('The sum of the counts of the selected cut site types must exceed 0')
                    bool_error = True

            '''
            Validate temperature
            '''

            if not self.temperature_field.data:
                self.temperature_field.errors.append("Please input the environment's temperature")
                bool_error = True
            else:
                self.temperature = convert_to_float(self.temperature_field.data) #Returns none if it is not a float
                if self.temperature == None:
                    self.temperature_field.errors.append("Please input a valid temperature")
                    bool_error = True
                elif self.temperature < app.config['MIN_TEMP'] or self.temperature > app.config['MAX_TEMP']:
                    self.temperature_field.errors.append("Temperature must be between " + str(app.config['MIN_TEMP']) + ' and ' + str(app.config['MAX_TEMP']) + ' degrees Celcius.')
                    bool_error = True
            if bool_error:
                return False

        #If we made it here, everything is valid
        return True
