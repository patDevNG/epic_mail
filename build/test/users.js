"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai.default.use(_chaiHttp.default);

describe('Testing the V2 endpoints', function () {
  describe('SignUp Endpoint', function () {
    it('Should ensure that user enteres a valid request',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _chai.default.request(_app.default).post('/api/v2/auth/signup/').type('form').send({
                "firstName": "Pat",
                "lastName": "Okuns",
                "country": "nigeria",
                "phoneNumber": " jus@123.com",
                "dateOfBirth": "123",
                "gender": "Male",
                "email": "e@b.com",
                "password": "123"
              });

            case 2:
              res = _context.sent;

              _chai.default.expect(res).to.have.status(400);

              _chai.default.expect(res.body).to.be.a('object');

              _chai.default.expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('SignUp Endpoint', function () {
    it('Should ensure that user enteres a valid request',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chai.default.request(_app.default).post('/api/v2/auth/signup/').type('form').send({
                "firstName": "patrick",
                "lastName": "Okuns",
                "country": "Nigeria",
                "phoneNumber": 1223445,
                "gender": "male",
                "email": "okuns.prck@epicmail.com",
                "password": "123"
              });

            case 2:
              res = _context2.sent;

              _chai.default.expect(res).to.have.status(201);

              _chai.default.expect(res.body).to.have.property('token');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
});