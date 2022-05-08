export default class ArticleNotFind extends Error {
  constructor (id) {
    super(`Artigo com o id: ${id} não encontrado`)
    this.status = 400
  }
}
