const jwt = require('jsonwebtoken')
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) return res.status(401).send({ message: 'Invalid request: Authorization token missing' })
    console.log(authHeader)

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.username = decoded.username
            next()
        }
    )
}

module.exports = verifyToken