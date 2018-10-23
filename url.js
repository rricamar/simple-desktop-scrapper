const CONFIG = require('./config');

class UrlHelper {
  get mainUrl() {
    return CONFIG.URL;
  }

  get browseUrl() {
    return `${CONFIG.URL}/${CONFIG.BROWSE}`;
  }

  sanitizeImageUrl(url) {
    const fullSizeUrl = url.split('.png')[0];
    const fullSizeUrlWithExtension = `${fullSizeUrl}.png`;
    return fullSizeUrlWithExtension;
  }
}

module.exports = UrlHelper;
