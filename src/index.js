import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

import connectToMongoDatabase from './services/database.js'

const startServer = async () => {
  await connectToMongoDatabase()

  const app = express()

  app.use(cors())

  app.use(express.json())
  app.use('/auth', authRoutes)

  app.use('/user', userRoutes)

  app.listen(3001, () => {
    console.log('Server is running on port 3000')
  })
}

startServer()