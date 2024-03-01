import User from '../../models/User.js'
import bcrypt from 'bcrypt'
import Joi from 'joi'
import { generateToken } from '../../utils/token.js'

const userSchema = Joi.object({
    fullName: Joi.string().trim().regex(/^[a-zA-Z\s]+$/).min(3).required().messages({
        'string.pattern.base': 'Full name must contain only letters',
        'string.min': 'Full name must be at least 3 characters long',
        'any.required': 'Full name is required'
    }),
    email: Joi.string().trim().email().lowercase().required().messages({
        'string.email': 'Invalid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#?!@$%^&*-])[A-Za-z\\d#?!@$%^&*-]{8,}$'
        ))
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@ $ ! % * ? &)',
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required'
        })
})

const signup_user = async (req, res) => {
    try {

        const { error, value } = userSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.details[0].message 
            })
        }

        const {
            fullName,
            email,
            password
        } = value

        const isEmailexists = await User.findOne({ email })

        if (isEmailexists) {
            return res.status(409).json({
                status: 409,
                message: "A user with this email address already exists."
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const user = new User({
            fullName,
            email,
            password: hashPassword,
        })

        const token = generateToken({ 
            userId: user._id, 
            email, 
            role: 'user' 
        })

        await user.save()

        res.cookie('zgAuth', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
            partitioned: true,
        }); 

        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const userLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
})

const login_user = async (req, res) => {

    try {

        const { error, value } = userLoginSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const { email, password } = value

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid login credentials' 
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(400).json({
                status: 400,
                message: "Invalid login credentials"
            })
        }

        const role = user.role

        const token = generateToken({ userId: user._id, email, role })

        res.cookie('zgAuth', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
            partitioned: true,
        });

        return res.status(200).json({
            success: true,
            message: 'Login successfull',
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, error: err.message })
    }
}

const logout_user = async (req, res) => {
    try {
        res.clearCookie('zgAuth');

        res.status(200).json({
            success: true,
            message: 'User successfully logged out',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

export {
    signup_user,
    login_user,
    logout_user
}