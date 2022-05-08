import '../database'
import Article from '../schemas/article'
import ArticleNotFind from '../errors/ArticleNotFind'

class ArticleService {
  async get (id) {
    try {
      const article = await Article.findOne({ id })
      if (!article) {
        throw new ArticleNotFind(id)
      }
      return article
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async list (page) {
    try {
      return await Article.find().skip((page * 10) - 10).sort({ id: 1 }).limit(10)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async insertArticles (articles) {
    try {
      let previousArticlesQtd = articles.length
      let tries = 0
      const maxTries = 10
      while (articles.length > 0) {
        if (articles.length === previousArticlesQtd) {
          tries += 1
          if (tries === maxTries) {
            throw new Error('Max tries exceeded')
          }
        } else {
          tries = 0
        }
        let articlesPromises = []

        for (const article of articles) {
          articlesPromises = [...articlesPromises, Article.create(article)]
        }
        const promisesResults = await Promise.allSettled(articlesPromises)

        let articlesNotAddedIndexes = []
        promisesResults.forEach((promise, index) => {
          if (promise.status === 'rejected') {
            articlesNotAddedIndexes = [...articlesNotAddedIndexes, index]
          }
        })
        previousArticlesQtd = articles.length
        articles = articles.filter((_, index) => articlesNotAddedIndexes.includes(index))
      }
      return 'Articles added!'
    } catch (error) {
      return error
    }
  }
}

export default new ArticleService()
