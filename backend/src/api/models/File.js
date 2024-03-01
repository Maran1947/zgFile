import mongoose from 'mongoose'

const fileSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    path: {
        type: String,
        unique: true,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shareId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Share',
        required: true
    }
}, {
    timestamps: true
})

const File = mongoose.model('File', fileSchema)

export default File