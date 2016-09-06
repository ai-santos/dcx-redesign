import express from 'express'
import routes from './routes'
import path from 'path'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import logger from 'morgan'

const server = express()

//view engine setup
server.set('views', path.join(__dirname, 'views'))


//middleware
server.use(logger('dev'))
server.use(express.static(__dirname+'/views'))
server.use(bodyParser.urlencoded({ extended: true }))

//routes
server.use('/', routes)

server.listen(process.env.PORT || 3000)