import { Router } from 'express'
import ArticlesController from './controllers/ArticlesController'

const routes = new Router()

routes.get('/', (req, res) => {
  res.json('Fullstack Challenge 2021 🏅 - Space Flight News')
})

routes.get('/articles', ArticlesController.index)

export default routes
