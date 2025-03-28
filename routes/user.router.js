const {Router} = require('express');
const { Signup, Login, getAllUSers } = require('../controllers/user.controller');

const userRouter =new Router();

userRouter.get("/all",getAllUSers)

userRouter.post("/signup",Signup)
userRouter.post("/login",Login)


module.exports = userRouter;