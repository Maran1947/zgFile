import { Router } from 'express'
import authRoutes from './auth/authRoutes.js'
import fileRoutes from './file/fileRoutes.js'
import shareRoutes from './share/shareRoutes.js'

const router = Router();

router.use('/auth', authRoutes)
router.use('/file', fileRoutes)
router.use('/share', shareRoutes)

export default router