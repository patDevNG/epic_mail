"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../model/user"));

var _user2 = _interopRequireDefault(require("../data/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SignUpController =
/*#__PURE__*/
function () {
  function SignUpController() {
    _classCallCheck(this, SignUpController);
  }

  _createClass(SignUpController, null, [{
    key: "signup",
    value: function signup(req, res) {
      var userData = req.body;
      var user = new _user.default(userData.id = _user2.default.length, userData.firstName, userData.lastName, userData.country, userData.phoneNumber, userData.dateOfBirth, userData.gender, userData.email, userData.password);

      if (!_user2.default.find(function (newUser) {
        return newUser.email === userData.email;
      })) {
        _bcryptjs.default.genSalt(10, function (_err, salt) {
          _bcryptjs.default.hash(user.password, salt, function (_err, hash) {
            user.password = hash;

            _user2.default.push(user);

            var payload = {
              subject: user._id
            };

            var token = _jsonwebtoken.default.sign(payload, 'secretkey');

            return res.status(201).json({
              'status': 201,
              token: token
            });
          });
        });
      } else {
        return res.status(401).json({
          'message': 'Email Already Exist',
          'status': 401
        });
      }
    }
  }]);

  return SignUpController;
}();

exports.default = SignUpController;