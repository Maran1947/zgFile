import { Schema, model } from 'mongoose'

const userSchema = Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user','admin']
    },
}, {
    timestamps: true
})

const User = model('User', userSchema)

export default User