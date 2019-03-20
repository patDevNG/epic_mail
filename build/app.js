"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _v = _interopRequireDefault(require("./usingObjects/routes/v1"));

var _v2 = _interopRequireDefault(require("./usingDb/routes/v2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use('/', _v.default);
app.use('/', _v2.default);
var PORT = process.env.PORT || 8080;
var server = app.listen(PORT, function () {
  console.log("Server Started at Port: ".concat(PORT));
});
var _default = server;
exports.default = _default;