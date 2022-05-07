import 'dotenv/config'
import mongoose from 'mongoose'

class Database {
  constructor () {
    this.connectMongo()
  }

  async connectMongo () {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URI)
  }

  closeConnection () {
    mongoose.connection.close()
  }

  dropCollection () {
    mongoose.connection.dropCollection('articles')
  }
}

export default new Database()
