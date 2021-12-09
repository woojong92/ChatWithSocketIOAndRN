const isNotLoggedIn = (req, res, next) => {
    const { user } = res.locals;
    if(user) {
      return res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
    next();
  }
  
  module.exports = isNotLoggedIn;

  