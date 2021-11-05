import jwt from 'jsonwebtoken'
import config from '../config'

export const AuthenticationTokenLoginMiddleware = (req, res, next) => {
    const authHeader = req.headers['X-Auth-Token']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.sendStatus(401)

    jwt.verify(token, config.loginSecKey, (err, user) => {
        if (err) return res.sendStatus(404)
        req.users = user
        next()
    })
}

export const AuthenticationTokenCreateAccountMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (token === null) return res.sendStatus(401)

    jwt.verify(token, config.createAccSecKey, (err, email) => {

        if (err) return res.sendStatus({ status: 404, msg: err })

        req.email = email
        next()
    })
}

export const loginCreateToken = (payload) => {
    return jwt.sign(payload, config.loginSecKey)
}


export const createAccountToken = (payload) => {
    return jwt.sign(payload, config.createAccSecKey)
}

