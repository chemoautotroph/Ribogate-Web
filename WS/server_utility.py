def SliderQuery(offset, numValues,sliderValue):
    #print "Num values" + str(numValues)
    cutoffs = [i/float(numValues) for i in range(1,numValues+1)]
    #print cutoffs
    for resultToView,cutoff in enumerate(cutoffs):
        if sliderValue < cutoff:
            break
    return resultToView + offset

def RangeFilter(offset, numVals, sliderLow, sliderHigh):
    low = SliderQuery(offset, numVals, sliderLow)
    high = SliderQuery(offset, numVals, sliderHigh)
    return [low, high]

def FractToAbs(fraction, low, high):
    delta = high - low
    return low + fraction * delta

def RangeSearch(input_list, fNames, fLims): #Takes a list of dicts as input
    results = list()
    for idx, elem in enumerate(input_list):
        foundCount = 0
        for name, lims in list(zip(fNames, fLims)):
            if lims[0] <= elem[name] <= lims[1]: #inclusive
                foundCount += 1
        if foundCount == len(fNames):
            results.append(idx)
    return results