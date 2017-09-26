const CONFIG = require('./config');

class UrlHelper {
  constructor() {
  }

  get mainUrl() {
    return CONFIG.URL;
  }

  get browseUrl() {
    return `${CONFIG.URL}/${CONFIG.BROWSE}`;
  }
}

module.exports = UrlHelper;
