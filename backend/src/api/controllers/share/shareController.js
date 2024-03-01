import bcrypt from 'bcrypt'
import zip from 'express-zip'
import Share from '../../models/Share.js'
import File from '../../models/File.js'

const create_share = async (req, res) => {
    const { name, password } = req.body
    const { userId } = req.user

    try {
        let hashPassword
        if(password) {
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password, salt)
        }
        const newShare = new Share({
            name,
            password: hashPassword,
            userId
        })

        await newShare.save()

        return res.status(200).json({
            success: true,
            message: 'Your files share created successfully',
            data: {
                shareId: newShare._id
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const get_share_by_id = async (req, res) => {
    const { userId } = req.user
    const { shareId } = req.params

    try {
        const existingShare = await Share.findOne({ _id: shareId, userId })
        const files = await File.find({ shareId, userId })
        return res.status(200).json({
            success: true,
            data: {
                share: existingShare,
                files
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const get_publish_share_by_id = async (req, res) => {
    const { shareId } = req.params

    try {
        const existingShare = await Share.findOne({ _id: shareId })
        return res.status(200).json({
            success: true,
            data: {
                share: existingShare,
                isPassword: !!existingShare.password
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const get_all_share_by_userId = async (req, res) => {
    const { userId } = req.user

    try {
        const allShares = await Share.find({ userId })
        return res.status(200).json({
            success: true,
            data: allShares
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const delete_share = async (req, res) => {
    const { userId } = req.user
    const { shareId } = req.params

    try {
        await Share.findOneAndDelete({ _id: shareId, userId })
        return res.status(200).json({
            success: true,
            message: 'Share deleted successfully'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const download_link = async (req, res) => {
    const { shareId } = req.params
    const { password } = req.body

    try {

        const existingShare = await Share.findOne({ _id: shareId })
        const passwordMatch = await bcrypt.compare(password, existingShare.password)

        if (!passwordMatch) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid password' 
            })
        }

        return res.status(200).json({
            success: true, 
            data: {
                download_link: `http://localhost:8000/api/v1/share/files/download/${shareId}`
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const download_files = async (req, res) => {
    const { shareId } = req.params

    try {
        const files = await File.find({ shareId })

        const downloadableFiles = files.map((file) => {
            return { path: file.path, name: file.originalname }
        })
        return res.zip(downloadableFiles)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export {
    create_share,
    get_share_by_id,
    get_all_share_by_userId,
    delete_share,
    get_publish_share_by_id,
    download_files,
    download_link
}