import jwt from 'jsonwebtoken'
import User from '../models/User.js'

async function verifyToken(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '')

  if (!token) return res.status(401).json({error: 'Access denied'})

  try {
    const decoded = jwt.verify(token, 'your-secret-key')

    req.user = await User.findById(decoded.userId)
    next()
  } catch (error) {
    res.status(401).json({error: 'Invalid token'})
  }
}

export default verifyToken