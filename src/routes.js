import { Router } from 'express'

const routes = new Router()

routes.get('/', (req, res) => {
  res.json('Fullstack Challenge 2021 🏅 - Space Flight News')
})

export default routes
