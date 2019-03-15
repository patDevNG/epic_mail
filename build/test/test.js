"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _assert = require("assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

describe('Testing the Auth Route', function () {
  describe('Test the Signup Endpoint', function () {
    it('Should create a new user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _chai$request$post$ty;

      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _chai.default.request(_app.default).post('/api/v1/auth/signup/').type('form').send((_chai$request$post$ty = {
                "firstName": "Pat",
                "lastName": "Okuns",
                "country": "nigeria",
                "email": " jus@123.com",
                "dateOfBirth": "123",
                "gender": "Male"
              }, _defineProperty(_chai$request$post$ty, "email", "e@b.com"), _defineProperty(_chai$request$post$ty, "password", "123"), _chai$request$post$ty));

            case 2:
              res = _context.sent;

              _chai.default.expect(res).to.have.status(201);

              _chai.default.expect(res.body).to.be.a('object');

              _chai.default.expect(res.body).to.have.property('token');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('Test the Signup Endpoint', function () {
    it('Should return an error for a user that already exit',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _chai$request$post$ty2;

      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chai.default.request(_app.default).post('/api/v1/auth/signup/').type('form').send((_chai$request$post$ty2 = {
                "firstName": "Pat",
                "lastName": "Okuns",
                "country": "nigeria",
                "email": " jus@123.com",
                "dateOfBirth": "123",
                "gender": "Male"
              }, _defineProperty(_chai$request$post$ty2, "email", "e@b.com"), _defineProperty(_chai$request$post$ty2, "password", "123"), _chai$request$post$ty2));

            case 2:
              res = _context2.sent;

              _chai.default.expect(res).to.have.status(401);

              _chai.default.expect(res.body).to.have.property('message');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('Test the Login Endpoint', function () {
    it('Should throw an error for an unregistered email',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _chai.default.request(_app.default).post('/api/v1/auth/login/').type('form').send({
                "email": "e@a.com",
                "password": "123"
              });

            case 2:
              res = _context3.sent;

              _chai.default.expect(res).to.have.status(401);

              _chai.default.expect(res.body).to.have.property('message');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('Test the Login Endpoint', function () {
    it('Should throw an error for an unregistered email',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _chai.default.request(_app.default).post('/api/v1/auth/login/').type('form').send({
                "email": "e@b.com",
                "password": "123"
              });

            case 2:
              res = _context4.sent;

              _chai.default.expect(res).to.have.status(401);

              _chai.default.expect(res.body).to.have.property('message');

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  }); // describe('Test the Send Message Endpoint', ()=>{
  //     it('Should not send mail when the email is not registered', async () => {
  //     const res = await chai.request(server).post('/api/v1/messages').type('form').send({
  //         "subject":"hi",
  //         "message":"loremmmmmmdsajddvzD AD aDAGSDGA IGIKD gosDHGO",
  //         "parentMessageId":"",
  //         "status":"draft",
  //         "recieversEmail":".com",
  //         "sendersEmail":"ggg"
  //     });
  //     chai.expect(res).to.have.status(401);
  //     chai.expect(res.body).to.have.prperty('message');
  //     });
  // });
  // // describe('Test the Send Message Endpoint', ()=>{
  //     it('Should send mail when the email is  registered',  (done) => {
  //    chai.request(server).post('/api/v1/messages').type('form').send({
  //         "subject":"hi",
  //         "message":"loremmmmmmdsajddvzD AD aDAGSDGA IGIKD gosDHGO",
  //         "parentMessageId":"",
  //         "status":"draft",
  //         "recieversEmail":"e@a.com",
  //         "sendersEmail":"ggg"
  //     }).end((err,res)=>{
  //         chai.expect(res).to.have.status(401);
  //         chai.expect(res).to.have.property('message');
  //         done();
  //     });
  //     });
  // });
});