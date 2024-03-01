import { Router } from 'express'
import { create_share, delete_share, download_files, download_link, get_all_share_by_userId, get_publish_share_by_id, get_share_by_id } from '../../controllers/share/shareController.js'
import { verifyAuthToken } from '../../middlewares/verifyAuth.js'
const router = Router()

router.post('/create', verifyAuthToken, create_share)
router.get('/all', verifyAuthToken, get_all_share_by_userId)
router.get('/publish/:shareId', get_publish_share_by_id)
router.post('/download/:shareId', download_link)
router.get('/files/download/:shareId', download_files)
router.get('/:shareId', verifyAuthToken, get_share_by_id)
router.delete('/:shareId', verifyAuthToken, delete_share)

export default router