import { createServer } from 'service-mocker/server'

const server = createServer()

server.router.get('/greet', (req, res) => {
  res.send('Hello new world!')
})

server.router.get('/greet', 'Hello new world!')

export default server
