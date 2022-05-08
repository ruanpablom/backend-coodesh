import db from '../src/database'
import { insertArticles } from '../src/services/ArticlesService'
import SpaceFlightService from '../src/services/SpaceFlightService'

export const popucalteDb = async () => {
  try {
    db.dropCollection('articles')
    console.log('Adding articles...')
    const { data: allArticles } = await SpaceFlightService.allArticles()
    const data = await insertArticles(allArticles)
    db.closeConnection()
    return data
  } catch (error) {
    db.closeConnection()
    return error
  }
}

popucalteDb().then(data => console.log(data)).catch(error => console.log(error))
