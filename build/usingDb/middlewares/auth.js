"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _secret = _interopRequireDefault(require("../config/secret"));

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
*this ensures that routes are guarded with a middleware
*the token is parsed and decoded each time
*/
var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: "verifyToken",
    value: function verifyToken(req, res, next) {
      var token = req.headers['x-access-token'];

      if (!token) {
        res.status(400).json({
          status: 400,
          Message: 'Missing token'
        });
      } else {
        _jsonwebtoken.default.verify(token, _secret.default.secret, function (err, result) {
          if (err) return res.status(400).json({
            status: 400,
            error: 'Incorrect credentials'
          });
          var queryText = "SELECT * FROM users WHERE id = $1;";
          var value = [result.userId];

          _db.default.query(queryText, value).then(function (response) {
            req.user = {
              id: result.userId
            };
            next();
          }, function (error) {
            res.status(400).json({
              status: 400,
              error: error
            });
          });
        });
      }
    }
  }]);

  return Auth;
}();

var _default = Auth;
exports.default = _default;