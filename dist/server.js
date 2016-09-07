'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

//view engine setup
server.set('views', _path2.default.join(__dirname, 'views'));
server.set('view engine', 'pug');

//middleware
server.use((0, _morgan2.default)('dev'));
server.use(_express2.default.static(__dirname + '/public'));
server.use(_bodyParser2.default.urlencoded({
  extended: true
}));

server.use(function (request, response, next) {
  response.locals.bodyClass = '';
  next();
});

//routes
server.use('/', _routes2.default);

server.listen(process.env.PORT || 3000);