"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _v = _interopRequireDefault(require("./routes/v1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const messages = require('../routes/message')
var app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use((0, _cors.default)());
app.use(_bodyParser.default.json()); // app.use('/api/v1',messages);

app.use('/', _v.default); // const PORT = process.env.PORT || 8080;

var port = 8080;
var server = app.listen(port, function () {
  console.log("Server Started at Port: ".concat(port));
});
var _default = server;
exports.default = _default;