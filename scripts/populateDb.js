import db from '../src/database'
import Article from '../src/schemas/article'
import axios from 'axios'

db.dropCollection()

axios.get(`${process.env.SPACEFLIGHT_URI}/articles/count`)
  .then(countResult => {
    const articlesCount = countResult.data
    axios.get(`${process.env.SPACEFLIGHT_URI}/articles?_limit=${articlesCount}&_sort=id&_start=0`)
      .then(async articlesResult => {
        let articles = articlesResult.data

        while (articles.length > 0) {
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

          articles = articles.filter((_, index) => articlesNotAddedIndexes.includes(index))
        }
        db.closeConnection()
      })
  })

//
