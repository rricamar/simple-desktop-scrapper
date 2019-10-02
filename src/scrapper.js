const fs = require("fs")
const path = require("path")
const request = require("request-promise-native")
const cheerio = require("cheerio")
const chalk = require("chalk")
const uid = require("uid")
const log = console.log
const UrlHelper = require("./url")


class Scrapper {

    constructor() {
        this.request = request
        this.cheerio = cheerio
        this.urlHelper = new UrlHelper()
    }


    async start() {
        log(chalk.blue("Starting..."))
        const body = await this.get(this.urlHelper.browseUrl)
        const html = this.parse(body)
        const imagesUrls = this.getImages(html)
        const binary = {
            encoding: "binary"
        }


        for (var i = 0; i < imagesUrls.length; i++) {
            const imageUrl = imagesUrls[i]
            const fixedImageUrl = this.urlHelper.getFullResImageUrl(imageUrl)
            const image = await this.get(fixedImageUrl, binary)
            const filename = uid(20) + ".png"
            this.save(filename, image)
        }
    }


    async get(url, options = {}) {
        log(chalk.blue(`Getting ${url} ...`))

        try {
            const body = await request(url, options)
            log(chalk.blue("... done!"))
            return body
        } catch (err) {
            this.onError(err)
        }
    }


    parse(html) {
        return this.cheerio.load(html)
    }


    save(filename, content) {
        const dir = "./images"

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }

        const base = filename
        const pathFile = path.format({ dir, base })
        log(chalk.green(`Saving ${pathFile} ...`))

        try {
            fs.writeFileSync(pathFile, content, "binary")
            log(chalk.green("... done!"))
        } catch (err) {
            this.onError(err)
        }
    }


    getImages(html) {
        const images = html("body .container .desktop img")
        const imagesUrls = images
            .map((index, elem) => elem.attribs.src)
            .toArray()
        return imagesUrls
    }


    onError(err) {
        log(chalk.red(err))
    }

}

module.exports = Scrapper
