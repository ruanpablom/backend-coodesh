import express from 'express'
import routes from './routes'
import './database'
import UpdateArticlesCron from './crons/UpdateArticlesCron'

class App {
  constructor () {
    this.server = express()
    this.routes()
    this.crons = [UpdateArticlesCron.job]
  }

  middlewares () {
    this.server.use(express.json())
  }

  routes () {
    this.server.use('/', routes)
  }
}

export default new App().server
