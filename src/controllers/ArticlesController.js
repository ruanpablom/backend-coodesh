import { onError, onSuccess } from '../handler'
import ArticlesService from '../services/ArticlesService'

class ArticlesController {
  async index (req, res) {
    try {
      let { page } = req.query
      page = page || 1
      const articles = await ArticlesService.list(page)
      return onSuccess(res, articles)
    } catch (error) {
      return onError(res, error)
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params
      const article = await ArticlesService.get(id)
      return onSuccess(res, article)
    } catch (error) {
      return onError(res, error)
    }
  }
}

export default new ArticlesController()
