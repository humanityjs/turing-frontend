const splitUrl = url => {
  const splited = url.split(/\?|&/);
  const realObject = {};
  splited.forEach(splits => {
    if (splits) {
      const resplit = splits.split('=');
      realObject[resplit[0]] = resplit[1];
      return;
    }
    return;
  });

  return realObject;
};

module.exports = {
  splitUrl
};
