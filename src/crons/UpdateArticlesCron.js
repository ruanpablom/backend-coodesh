import { CronJob } from 'cron'
import Article from '../schemas/article'
import SpaceFlightService from '../services/SpaceFlightService'
import ArticleService from '../services/ArticlesService'

class UpdateArticleCron {
  constructor () {
    this.job = new CronJob('0 0 9 * * *', async () => {
      try {
        const { publishedAt } = await Article.findOne().sort({ id: -1 })
        const { data: lastArticles } = await SpaceFlightService.lastArticles(publishedAt)
        console.log('Job UpdateArticleCron: ', new Date(), await ArticleService.insertArticles(lastArticles))
      } catch (error) {
        console.log('UpdateArticle Job Error: ', error.message)
      }
    }, null, true, 'America/Sao_Paulo')
  }
}

export default new UpdateArticleCron()
