'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('./../config');

function createToken (user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        // le decimos que caduce en 14 días
        exp: moment().add(14, 'days').unix(),
    }
    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken (token) {
    const decoded = new Promise((resolve, reject) => {
        // usaremos resolve cuando se resuelva la petición
        // aunque puede que el token haya expirado
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);

            if (payload.exp <= moment().unix()) {
                reject ({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve (payload.sub);
        } catch (err) {
            // usaremos reject cuando tengamos algún error
            reject ({
                status: 500,
                message: 'Invalid token'
            })
        }
    })
    return decoded;
}

module.exports = {
    createToken, 
    decodeToken
}