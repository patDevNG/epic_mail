"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../data/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoginController =
/*#__PURE__*/
function () {
  function LoginController() {
    _classCallCheck(this, LoginController);
  }

  _createClass(LoginController, null, [{
    key: "login",
    value: function login(req, res) {
      var userData = req.body;

      var evaluateUser = _user.default.find(function (dataBaseUser) {
        return dataBaseUser.email === userData.email;
      });

      if (evaluateUser) {
        _bcryptjs.default.compare(userData.password, evaluateUser.password, function (err, result) {
          if (result === true) {
            var payload = {
              subject: evaluateUser.id
            };

            var token = _jsonwebtoken.default.sign(payload, 'secret');

            var status = 201;
            res.status(201).json({
              token: token,
              status: status
            });
          } else {
            return res.status(401).json({
              'status': 401,
              'message': 'Invalid Password'
            });
          }
        });
      } else {
        return res.status(401).json({
          'status': 401,
          'message': "invalid Email"
        });
      }
    }
  }]);

  return LoginController;
}();

exports.default = LoginController;