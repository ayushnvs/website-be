const jwt = require('jsonwebtoken')

const authorize = (req, res, next) => {
    const jwtKey = process.env.JWT_KEY
    const token = req.headers['Authorization']

    if (token) {
        token = token.split(' ')[1]
        jwt.verify(token, jwtKey).then(result => next()).catch(err => {
            res.status(401).send({message: 'Unauthorized: Invalid token'})
        })
    } else {
        res.status(403).send({message: 'Invalid request: Authorization token missing'})
    }
}

export default authorize