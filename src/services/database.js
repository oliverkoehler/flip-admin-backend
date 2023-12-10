import mongoose from 'mongoose'

const connectToMongoDatabase = async () => {
  try {
    // Set database authentication on production environment
    const dbAuth =
            process.env.APP_ENV === 'production'
              ? process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@'
              : process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@'

    // Set up default mongoose connection
    let url = process.env.DB_CONNECTION + '://' + dbAuth + process.env.DB_HOST + '/' + process.env.DB_DATABASE

    if (process.env.APP_ENV === 'production') url += '?retryWrites=true&w=majority'

    mongoose.set('strictQuery', true)
    // mongoose.set('useFindAndModify', false)

    await mongoose.connect(url)

    const db = mongoose.connection

    db.on('connection', () => {
      console.log('connected')
    })

    // Bind connection to error event (to get notification of connection errors)
    db.on('error', (err) => {
      console.log('error...trying to reconnect', err)
    })
    db.on('disconnected', async (err) => {
      console.log('disconnected...trying to reconnect', err)
      await mongoose.connect(url)
    })
  } catch (error) {
    console.log(error)
  }
}

export const validToken = () => {
  return {
    validUntil: { $gte: new Date() },
    disabled: { $ne: true }
  }
}

export default connectToMongoDatabase