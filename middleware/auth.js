const jwt = require('jsonwebtoken')

const TokenControl = (req, res, next) => {
    let token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    jwt.verify(token.split('Bearer ')[1], process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(404).json({ message: 'Token is invalid' })
        req.user = user
        next()
    })
}

module.exports = TokenControl