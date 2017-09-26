const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const uid = require('uid');
const log = console.log;
const UrlHelper = require('./url');

class Scrapper {
  constructor() {
    this.request = request;
    this.cheerio = cheerio;
    this.urlHelper = new UrlHelper();
  }

  start() {
    log(chalk.blue('Starting...'));
    return this
      .get(this.urlHelper.browseUrl)
      .then((body) => {
        const html = this.parse(body);
        const images = this.getImages(html);
        log(chalk.blue(`There are ${images.length} images on this page ...`));
        Promise.all(images.map((imageUrl) => {
          return this.get(imageUrl, {
            encoding: 'binary'
          }).then((image) => {
            const filename = uid(20) + '.png';
            this.save(filename, image);
          });
        }));
      })
      .catch(this.onError)
  }

  get(url, options = {}) {
    log(chalk.blue(`Getting ${url} ...`));
    return new Promise((resolve, reject) => {
      request(url, options, (error, response, body) => {
        if (error) return reject(error);
        log(chalk.blue(`... done!`));
        return resolve(body);
      });
    });
  }

  parse(html) {
    return this.cheerio.load(html);
  }

  save(filename, content) {
    const pathFile = path.format({
      dir: './images',
      base: filename
    });
    log(chalk.green(`Saving ${pathFile} ...`));
    try {
      fs.writeFileSync(pathFile, content, 'binary');
      log(chalk.green(`... done!`));
    } catch (err) {
      this.onError(err);
    }
  }

  getImages(html) {
    const images = html('body .container .desktop img');
    const imagesUrls = images.map((index, elem) => elem.attribs.src).toArray();
    return imagesUrls;
  }

  onError(err) {
    chalk.red(err);
  }
}

module.exports = Scrapper;
