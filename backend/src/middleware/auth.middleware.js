import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, resp) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return resp.status(401), json({ message: 'Unauthorized - No Token provided' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return resp.status(401), json({ message: 'Invalid Token' })
        }

        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return resp.status(404), json({ message: 'User not found' })

        }

        req.user = user
        next()

    } catch (error) {
        console.log('Error in protectRoute middleware', error.message)
        resp.status(500).json({ message: 'Internal Server Error' })
    }
}