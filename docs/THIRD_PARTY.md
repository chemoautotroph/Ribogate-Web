# Restored interface dependencies

Original research credit for Ribogate belongs to Nicholas (Nick) Kamel. These interface libraries are separate third-party work.

The supplied local snapshot contained jQuery UI 1.9.2 `ui-lightness` CSS but omitted its referenced theme images, and contained Bootstrap 3.4.1 CSS without its WOFF2 fallback font. The deployment archive restores those version-matched files so a clean checkout does not depend on cached browser assets.

- jQuery UI 1.9.2 theme images: https://code.jquery.com/ui/1.9.2/themes/ui-lightness/images/ . Copyright jQuery Foundation and other contributors; [retained MIT license](../licenses/jquery-ui-1.9.2-MIT.txt).
- Bootstrap 3.4.1 Glyphicons WOFF2 font: https://github.com/twbs/bootstrap/blob/v3.4.1/dist/fonts/glyphicons-halflings-regular.woff2 . [Retained Bootstrap license](../licenses/bootstrap-3.4.1-MIT.txt).

The exact source URLs and SHA-256 hashes for these added files are in [`ui-assets-manifest.json`](../ui-assets-manifest.json). The files are small and included directly in the repository; no extra setup download is required. Existing third-party notices in all other bundled assets are retained.

The supplied CSS also referenced a missing hashed landing-page photograph, `ab0bba3c3abc3c26acfd5f2029cd50d7.jpg`, whose original file/source was not present. That broken reference is replaced with a CSS gradient in `site.css` and its archived backup. No replacement photograph or unverified image license is introduced; this is a cosmetic deployment repair, not a reconstruction of the unavailable photograph.

The Python runtime and customized ViennaRNA executables are downloaded separately. Their source locations/checksums are in `python-manifest.json` and `vienna-manifest.json`; downloaded Python distributions retain their supplied notices. This document does not grant a new license for the research application.
