function isLoggedIn (req, res, next)  {
  const { user } = res.locals;
  if(!user) {
    return res.status(401).send('로그인이 필요합니다.');
  }
  next();
};

module.exports = isLoggedIn;