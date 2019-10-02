const Scrapper = require("./src/scrapper")
const scrapper = new Scrapper();


(async () => await scrapper.start())()
