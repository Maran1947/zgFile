import { verifyToken } from '../utils/token.js'

const authTypes = {
    access: 'ACCESS',
}

export const verifyAuthToken = async (req, res, next) => {

    const token = req.cookies?.zgAuth;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' })
    }
    
    try {
        const decodedToken = verifyToken({ token, type: authTypes.access})
        req.user = decodedToken
        next()
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ success: false, message: 'Invalid token' })
        } else {
            return res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}