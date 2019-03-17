"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var user = function user(id, firstName, lastName, country, phoneNumber, dateOfBirth, gender, email, password) {
  _classCallCheck(this, user);

  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.country = country;
  this.phoneNumber = phoneNumber;
  this.dateOfBirth = dateOfBirth;
  this.gender = gender;
  this.email = email;
  this.password = password;
};

exports.default = user;