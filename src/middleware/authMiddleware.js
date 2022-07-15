import jwt from 'jsonwebtoken'
import { key } from '../config.js'

export default function(req, res, next) {
    if (req.method === 'OPTIONS') next()

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ message: 'User is not authorized'})
        }
        const decodeData = jwt.verify(token, key.secret)
        req.user = decodeData
        next()
    } catch (e) {
        console.error('User is not authorized', e)
        return res.status(403).json({ message: 'User is not authorized'})
    }
}