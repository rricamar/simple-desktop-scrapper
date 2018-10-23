const Scrapper = require("./scrapper");
const scrapper = new Scrapper();

(async () => {
  await scrapper.start();
})();
