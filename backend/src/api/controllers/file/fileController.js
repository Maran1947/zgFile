import File from "../../models/File.js"
import Share from "../../models/Share.js"

const save_file = async (req, res) => {
    const { userId } = req.user
    const { shareId } = req.body

    try {
        let newFiles = []
        req.files.map((file) => {
            const newFile = new File({
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                size: file.size,
                userId,
                shareId
            })
            newFiles.push(newFile)
        })

        let totalSize = newFiles.reduce((prev, { size }) => prev + size, 0);

        await Share.findOneAndUpdate({ _id: shareId, userId },{
            totalFiles: newFiles.length,
            totalSize,
            isShared: true,
        })

        await File.insertMany(newFiles)
        return res.status(200).json({
            success: true,
            message: 'Image saved successfully',
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong!'
        })
    }
}

const get_file_by_id = async (req, res) => {
    const { fileId } = req.params
    const { userId } = req.user
    try {
        const userFile = await File.findOne({ _id: fileId, userId });

        return res.status(200).json({
            success: true,
            data: userFile
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong!'
        })
    }
}

const get_files_by_user = async (req, res) => {
    const { userId } = req.user
   
    try {
        const files = await File.find({ userId });
        return res.status(200).json({
            success: true,
            data: files
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong!'
        })
    }
}

export {
    save_file,
    get_file_by_id,
    get_files_by_user
}