import http from 'http'
import app from './app'

const port = process.env.PORT || 3333
const server = http.createServer(app)

server.listen(port, '0.0.0.0', () => {
  console.info(`Servidor rodando na porta: ${port}`)
})
