import axios from 'axios'

class SpaceFlightService {
  async countArticles () {
    return axios.get(`${process.env.SPACEFLIGHT_URI}/articles/count`)
  }

  async allArticles () {
    const { data: countArticles } = await this.countArticles()
    return axios.get(`${process.env.SPACEFLIGHT_URI}/articles?_limit=${countArticles}&_sort=id&_start=0`)
  }
}

export default new SpaceFlightService()
