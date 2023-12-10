import express from 'express'
import verifyToken from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/me', verifyToken, (req, res) => {
  res.status(200).json(req.user)
})

export default router