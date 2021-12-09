const express = require("express");
const asyncify = require("express-asyncify");
const { User } = require("../../models");
const jwt = require('jsonwebtoken');
const isLoggedIn = require("../../libs/isLoggedIn");
const JWT_SECRET = process.env.JWT_SECRET;

const users = asyncify(express.Router()); 

users.get('/', isLoggedIn, async (req, res) => { 
    const user = await User.findOne({
        where: { id: res.locals.user.id}
    });
    return res.status(201).json(user)
} );

// 회원가입
users.post('/', async (req, res) => { 
    const {name,  phoneNumber, signupType, snsId, email, password} = req.body;
    
    console.log("[req.body] : ", req.body);
    let isExistUser;
    if(signupType === 'email') {
        isExistUser = await User.findOne({
            where: { email, signupType , password}
        })
    }else{
        isExistUser = await User.findOne({
            where: { snsId, signupType }
        })
    }
    if(isExistUser)  {
        return res.status(404).send("이미 존재하는 계정입니다.");   
    }
    const user = await User.create({
        name,
        phoneNumber,
        signupType,
        snsId,
        email,
        password,
    });
    console.log('user : ', user);
    res.status(201).json(user);
} );

users.post('/login', async (req, res) => { 
    const {signupType, snsId, email, password} = req.body;
    let user;
    if(signupType === 'email') {
        user = await User.findOne({
            where: { email, signupType , password}
        }) 
    }else{
        user = await User.findOne({
            where: { snsId, signupType }
        })
    }
    if(!user) res.status(404)
    const accessToken = jwt.sign(
        {
            id: user.id,
            name: user.name,
            signupType: user.signupType,
            snsId: user.snsId,
            email: user.email,
        },
        JWT_SECRET,
        {
            expiresIn: '7d', // 7일 동안 유효함
        }
    );
    res.status(201).json({user, accessToken});
} );

users.post('/logout', (req, res) => { res.send('logout'); } );

module.exports = users;

