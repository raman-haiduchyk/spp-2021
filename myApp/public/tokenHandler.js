const jwt = require('jsonwebtoken');
const secret = require('./env');
const crypto = require('crypto');

function generateAccessToken(username){

    const data = {
        name: username,
        iss: secret.ISSUER
    }

    return jwt.sign(data, secret.TOKEN_SECRET, { expiresIn: secret.EXPIRATION });
}

function generateRefreshToken(){
    return crypto.randomBytes(64).toString('hex')
}

function validateAccessToken(token){
    try {
        const data = jwt.verify(token, secret.TOKEN_SECRET, { issuer: secret.ISSUER });
        return data.name;
    } catch {
        return null;
    }  
}

function getAccessTokenFromHeader(headers){
    const authHeader = headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    return token;
}

function validateAccessTokenFromHeader(headers){
    const token = getAccessTokenFromHeader(headers);
    if (!token) return null;
    const data = validateAccessToken(token);
    return data;
}

function decodeAccessToken(token){
    return jwt.decode(token);
}

module.exports = {
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken,
    getAccessTokenFromHeader: getAccessTokenFromHeader,
    validateAccessToken: validateAccessToken,
    validateAccessTokenFromHeader: validateAccessTokenFromHeader,
    decodeAccessToken: decodeAccessToken
}