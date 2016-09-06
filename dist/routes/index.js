'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (request, response) {
  response.render('index', {});
});

router.get('/about', function (request, response) {
  response.render('about', {});
});

router.get('/gallery', function (request, response) {
  response.render('gallery', {});
});

router.get('/contact', function (request, response) {
  response.render('contact', {});
});
module.exports = router;