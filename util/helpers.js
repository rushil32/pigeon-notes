exports.getDomain = (url) => {
  return /www\.(\w+)\.com/.exec(url)[1];
};

