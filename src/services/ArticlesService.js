import db from '../database'
import Article from '../schemas/article'
import axios from 'axios'

export const insertArticles = async (articles) => {
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

export const popucalteDb = async () => {
  db.dropCollection('articles')
  console.log('Adding articles...')
  const { data: articlesCount } = await axios.get(`${process.env.SPACEFLIGHT_URI}/articles/count`)
  const { data: articles } = await axios.get(`${process.env.SPACEFLIGHT_URI}/articles?_limit=${articlesCount}&_sort=id&_start=0`)
  const data = await insertArticles(articles)
  db.closeConnection()
  return data
}
