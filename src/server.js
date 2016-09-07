import express from 'express'
import routes from './routes'
import path from 'path'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import logger from 'morgan'
import pug from 'pug'

const server = express()

//view engine setup
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug')

//middleware
server.use(logger('dev'))
server.use(express.static(__dirname + '/public'))
server.use(bodyParser.urlencoded({
  extended: true
}))

server.use(function(request, response, next){
  response.locals.bodyClass = ''
  next()
})

//routes
server.use('/', routes)

server.listen(process.env.PORT || 3000)
