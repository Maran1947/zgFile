import jwt from 'jsonwebtoken'

const generateToken = ({ userId, email, role }) => {
    const token = jwt.sign(
        { userId, email, role },
        process.env.TOKEN_KEY,
        { expiresIn: process.env.JWT_EXPIRES }
    )

    return token
}


const verifyToken = ({ token, type }) => {
    const secretObj = {
        ACCESS: process.env.TOKEN_KEY, 
    }

    return jwt.verify(token, secretObj[type])
}


export {
    generateToken,
    verifyToken
};