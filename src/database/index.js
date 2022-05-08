import 'dotenv/config'
import mongoose from 'mongoose'

class Database {
  constructor () {
    this.connectMongo()
  }

  async connectMongo () {
    mongoose.connect(process.env.MONGO_URI)
  }

  closeConnection () {
    mongoose.connection.close()
  }

  dropCollection (collection) {
    mongoose.connection.dropCollection(collection)
  }
}

export default new Database()
