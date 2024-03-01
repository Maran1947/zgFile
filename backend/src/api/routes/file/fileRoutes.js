import { Router } from 'express'
import { get_file_by_id, get_files_by_user, save_file } from '../../controllers/file/fileController.js'
import { verifyAuthToken } from '../../middlewares/verifyAuth.js'
import uploadFiles from '../../middlewares/uploadFile.js'
const router = Router()

router.post('/upload', [verifyAuthToken, uploadFiles], save_file)
router.get('/all', verifyAuthToken, get_files_by_user)
router.get('/:fileId', verifyAuthToken, get_file_by_id)

export default router