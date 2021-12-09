const jwt = require('jsonwebtoken');
// const JWT_SECRET = "a7eebf12dcf772213ddfc2d95b151f773e483c905a59a4c0362b7b527cca84bc3118607c1d4781da4188863014d9a4c7e29d67d2db81fef804c8f0fca1980fcb"
const JWT_SECRET = process.env.JWT_SECRET;

function jwtMiddleware (req, res, next) {
        console.log('jwtMiddleware');
        // const token = req.get('Authorization').split('Bearer ')[1];
        // const token = req.cookies.access_token;
        const authorization = req.get('Authorization');
        console.log('Authorization',authorization );
        if(!authorization) return next();
        
        const token = authorization.split('Bearer ')[1];
        console.log('token',token );
        try{
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log('[decoded] : ', decoded);

            res.locals.user = {
                id: decoded.id,
                name: decoded.name,
                signupType: decoded.signupType,
                snsId: decoded.snsId,
                email: decoded.email, 
  
                // nickname: decoded.nickname,
                // role: decoded.role,
                // thumbnail: decoded.thumbnail,
                // authority: decoded.authority,
            }
            next();
        }catch(e){
            next();
        }
}

module.exports = jwtMiddleware;