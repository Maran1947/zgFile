import mongoose from 'mongoose'

const shareSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    totalFiles: {
        type: Number,
    },
    totalSize: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isShared: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
    },
    downloadLimit: {
        type: Number,
    }
}, {
    timestamps: true
})

const Share = mongoose.model('Share', shareSchema)

export default Share