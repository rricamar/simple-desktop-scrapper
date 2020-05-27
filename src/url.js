const CONFIG = require("./config")


class UrlHelper {

    get mainUrl() {
        return CONFIG.URL
    }


    get browseUrl() {
        return `${CONFIG.URL}/${CONFIG.BROWSE}`
    }


    getFullResImageUrl(url) {
        const extension = url.includes(".jpg") ? ".jpg" : ".png"
        const fullSizeUrl = url.split(extension)[0]
        const fullSizeUrlWithExtension = `${fullSizeUrl}${extension}`
        return { fullSizeUrlWithExtension, extension }
    }

}

module.exports = UrlHelper
