const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/balcklist.model")

function getToken(req) {
    const cookieToken = req.cookies?.token
    const authHeader = req.headers.authorization
    const bearerToken = authHeader?.match(/^Bearer\s+(\S+)$/i)?.[1]

    return cookieToken || bearerToken
}

async function authMiddleware(req, res, next) {
    const token = getToken(req)
    if (!token) {
        return res.status(401).json({
          message: "unauthorize access, token is missing"  
        })
    }

    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    const isBlacklisted = await tokenBlackListModel.exists({ token })
    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorize access token is invalid"
        })
    }

    const user = await userModel.findById(decoded.userId)
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    req.user = user
    return next()
}

async function authSystemUserMiddleware(req, res, next){
    const token = getToken(req)

    if (!token){
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }

    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    const isBlacklisted = await tokenBlackListModel.exists({ token })
    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorize access token is invalid"
        })
    }

    const user = await userModel.findById(decoded.userId).select("+systemUser")
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    if (!user.systemUser) {
        return res.status(403).json({
            message: "forbidden access, not a system user"
        })
    }

    req.user = user
    return next()
}


module.exports = {
    authMiddleware,
    authSystemUserMiddleware
}