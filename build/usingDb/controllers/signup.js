"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = _interopRequireDefault(require("../config/db"));

var _joi = _interopRequireDefault(require("joi"));

var _schema = _interopRequireDefault(require("../model/schema"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _queries = _interopRequireDefault(require("../config/queries"));

var _secret = _interopRequireDefault(require("../config/secret"));

var _dbhelpers = _interopRequireDefault(require("../config/dbhelpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
this enables new user to be able to signup
* @param {Object} req- request from the client side
* @param {Object} res -response from the backend
*@returns {Object} a message which can be success or error
*/
var SignUpController =
/*#__PURE__*/
function () {
  function SignUpController() {
    _classCallCheck(this, SignUpController);
  }

  _createClass(SignUpController, null, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var validateUser, userData, _ref, rowCount, salt, hash, userTableValue, AddingUser, id, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                validateUser = _schema.default.userSignUp(req.body);

                if (!(validateUser.error === null)) {
                  _context.next = 34;
                  break;
                }

                userData = {};
                userData.firstName = req.body.firstName;
                userData.lastName = req.body.lastName;
                userData.country = req.body.country;
                userData.phoneNumber = req.body.phoneNumber;
                userData.gender = req.body.gender;
                userData.email = req.body.email;
                userData.password = req.body.password;
                console.log(userData);
                _context.next = 14;
                return _db.default.query(_queries.default.checkIfUserExist, [userData.email]);

              case 14:
                _ref = _context.sent;
                rowCount = _ref.rowCount;

                if (!(rowCount === 0)) {
                  _context.next = 31;
                  break;
                }

                _context.next = 19;
                return _bcryptjs.default.genSaltSync(10);

              case 19:
                salt = _context.sent;
                hash = _bcryptjs.default.hashSync(userData.password, salt);
                userData.password = hash;
                userTableValue = [userData.firstName, userData.lastName, userData.country, userData.phoneNumber, userData.gender, userData.email, userData.password];
                _context.next = 25;
                return _db.default.query(_queries.default.insertUsers, userTableValue);

              case 25:
                AddingUser = _context.sent;
                id = AddingUser.rows[0].id;
                token = _jsonwebtoken.default.sign(id, _secret.default.SECRET);
                return _context.abrupt("return", res.status(201).json({
                  'status': 201,
                  token: token,
                  'message': "Welcome ".concat(userData.firstName)
                }));

              case 31:
                return _context.abrupt("return", res.status(401).json({
                  'status': 400,
                  'message': 'Email Already Exist'
                }));

              case 32:
                _context.next = 35;
                break;

              case 34:
                return _context.abrupt("return", res.status(400).json({
                  'status': 400,
                  'message': 'Check your input'
                }));

              case 35:
                _context.next = 39;
                break;

              case 37:
                _context.prev = 37;
                _context.t0 = _context["catch"](0);

              case 39:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 37]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }]);

  return SignUpController;
}();

exports.default = SignUpController;