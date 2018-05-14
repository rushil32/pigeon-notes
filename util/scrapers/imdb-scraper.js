const request = require('request');
const cheerio = require('cheerio');

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    const genres = [];
    request(url, (error, response, html) => {
      if (!error) {
        const $ = cheerio.load(html);

        const data = {
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

          plot: $('.summary_text')
            .text()
            .trim(),

          poster: $('.poster img')
            .attr('src'),

          trailer: `http://www.imdb.com${$('.video_slate')
            .first()
            .children('a.video-modal')
            .attr('href')}`,
        };

        $('.title_wrapper > .subtext > a > span').each(function (i) {
          genres[i] = $(this).text();
        });

        data.genres = genres;
        resolve(data);
      } else {
        reject(new Error('URL could not be parsed'));
      }
    });
  });
};
