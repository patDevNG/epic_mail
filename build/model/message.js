"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function Message(messageId, createdOn, subject, message, parentMessageId, status, recieversEmail, sendersEmail, recieversId, sendersId) {
  _classCallCheck(this, Message);

  this.messageId = messageId;
  this.createdOn = createdOn;
  this.subject = subject;
  this.message = message;
  this.parentMessageId = parentMessageId;
  this.status = status;
  this.recieversEmail = recieversEmail, this.sendersEmail = sendersEmail, this.recieversId = recieversId, this.sendersId = sendersId;
};

exports.default = Message;