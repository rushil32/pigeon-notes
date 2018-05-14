const request = require('request');
const cheerio = require('cheerio');

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      if (!error) {
        const $ = cheerio.load(html);

        resolve({
          title: $('.title_wrapper > h1')
            .clone()
            .children()
            .remove()
            .end()
            .text()
            .trim(),

          year: $('#titleYear')
            .children('a')
            .text(),

          rating: $('.ratingValue > strong > span')
            .text(),

          genres: $('.title_wrapper > .subtext > a > span')
            .text(),

          plot: $('.summary_text')
            .text()
            .trim(),
        });
      } else {
        reject(new Error('URL could not be parsed'));
      }
    });
  });
};
