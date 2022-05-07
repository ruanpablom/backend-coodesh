import 'dotenv/config'
import mongoose from 'mongoose'

class Database {
  constructor () {
    this.mongo()
  }

  mongo () {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URI)
  }
}

export default new Database()
