const jwt = require('jsonwebtoken');

const generateToken = async(data)=>{
    const token = await jwt.sign(data,process.env.JWT_SECRET_KEY,{
        expiresIn:"3d",
    })
    return token;
}

const verifyToken = async(token)=>{
    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY)
        return decoded
    } catch (error) {
        return false
    }
}

module.exports = {
    generateToken,
    verifyToken
}