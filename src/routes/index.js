import express from 'express'

const router = express.Router()

router.get('/', (request, response) => {
  response.render('index', {})
})

router.get('/about', (request, response) => {
  response.render('about', {
    bodyClass: 'about-page'
  })
})

router.get('/gallery', (request, response) => {
  response.render('gallery', {})
})

router.get('/contact', (request, response) => {
  response.render('contact', {})
})
module.exports = router
