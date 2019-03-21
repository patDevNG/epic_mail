"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = _interopRequireDefault(require("../config/db"));

var _schema = _interopRequireDefault(require("../model/schema"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("joi"));

var _queries = _interopRequireDefault(require("../config/queries"));

var _user = _interopRequireDefault(require("../../usingObjects/data/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var userData, _ref, rowCount, rows, validPassword, payload, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                userData = {};
                userData.email = req.body.email;
                userData.password = req.body.password;
                _context.next = 6;
                return _db.default.query(_queries.default.checkIfUserExist, [userData.email]);

              case 6:
                _ref = _context.sent;
                rowCount = _ref.rowCount;
                rows = _ref.rows;
                console.log(rows);

                if (!(rowCount === 0)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  'status': 404,
                  'message': 'Email Does not Exist'
                }));

              case 14:
                _context.next = 16;
                return _bcryptjs.default.compareSync(userData.password, rows[0].password);

              case 16:
                validPassword = _context.sent;

                if (validPassword) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  'status': 200,
                  'message': 'Invalid Password'
                }));

              case 21:
                payload = {
                  subject: userData.email
                };
                token = _jsonwebtoken.default.sign(payload, process.env.SECRET);
                return _context.abrupt("return", res.status(200).json({
                  'status': 200,
                  token: token,
                  'message': 'Login Successful'
                }));

              case 24:
                _context.next = 28;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context["catch"](0);

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 26]]);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return LoginController;
}();

exports.default = LoginController;