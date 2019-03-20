"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validation =
/*#__PURE__*/
function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: "userSignUp",
    value: function userSignUp(user) {
      var schema = {
        firstName: _joi.default.string().min(3).required(),
        lastName: _joi.default.string().min(3).required(),
        country: _joi.default.string().min(3).required(),
        phoneNumber: _joi.default.number().min(3).required(),
        gender: _joi.default.string().min(3).required(),
        email: _joi.default.string().min(3).required(),
        password: _joi.default.string().min(3).required()
      };
      return _joi.default.validate(user, schema);
    }
  }, {
    key: "loginUser",
    value: function loginUser(user) {
      var schema = {
        email: _joi.default.string().min(3).required(),
        password: _joi.default.string().min(3).required()
      };
      return _joi.default.validate(user, schema);
    }
  }, {
    key: "message",
    value: function message(_message) {
      var schema = {
        subject: _joi.default.string().min(3).required(),
        message: _joi.default.string().min(3).required(),
        email: _joi.default.string()
      };
      return _joi.default.validate(_message, schema);
    }
  }]);

  return Validation;
}();

exports.default = Validation;