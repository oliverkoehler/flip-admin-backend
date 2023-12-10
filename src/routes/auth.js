// routes/auth.js
import express from 'express'
const router = express.Router()

import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// User login
router.post('/login', async (req, res) => {
  try {
    const { name, apiKey } = req.body
    console.log(req.body)
    const user = await User.findOne({ name, apiKey })

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' })
    }

    const passwordMatch = apiKey === user.apiKey
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' })
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '386h',
    })
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router