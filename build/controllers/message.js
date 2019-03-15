"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("../data/user"));

var _message = _interopRequireDefault(require("../data/message"));

var _message2 = _interopRequireDefault(require("../model/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Imports the datastructure that holds users and messages
before continuing */
var MessageController =
/*#__PURE__*/
function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: "sendMessage",
    value: function sendMessage(req, res) {
      var messageData = req.body;
      var newMessages = new _message2.default(messageData.messageId = _message.default.length, messageData.createdOn = Date.now, messageData.subject, messageData.message, messageData.parentMessageId, messageData.status, messageData.recieversEmail, messageData.sendersEmail);

      var evaluateUser = _user.default.find(function (dataBaseUser) {
        return dataBaseUser.email === newMessages.recieversEmail;
      });

      if (evaluateUser && newMessages.status === 'sent') {
        _message.default.push(newMessages);

        var sentMessage = {
          messageId: newMessages.messageId,
          createdOn: newMessages.createdOn,
          subject: newMessages.subject,
          message: newMessages.message,
          status: newMessages.status
        };
        res.status(201).json({
          'status': 201,
          sentMessage: sentMessage,
          'message': 'Message Sent Successfully'
        });
      } else {
        if (newMessages.status === 'draft' || newMessages.recieversEmail === '') {
          _message.default.push(newMessages);

          var _sentMessage = {
            messageId: newMessages.messageId,
            createdOn: newMessages.createdOn,
            subject: newMessages.subject,
            message: newMessages.message,
            status: newMessages.status
          };
          res.status(201).json({
            'status': 201,
            sentMessage: _sentMessage,
            'message': 'Message Saved Successfully'
          });
        } else {
          if (!evaluateUser) {
            res.status(401).json({
              'message': "Invalid Email"
            });
          }
        }
      }
    }
  }, {
    key: "getAllMessages",
    value: function getAllMessages(req, res) {
      var evaluateUser = _user.default.find(function (evaluateUser) {
        return evaluateUser.id === parseInt(req.params.id);
      });

      console.log(evaluateUser);
      res.status(200).json({
        'status': 200,
        evaluateUser: evaluateUser
      });
    }
  }, {
    key: "getAllMessages",
    value: function getAllMessages(req, res) {
      var getAllMessages = _message.default.filter(function (recievedMsg) {
        return recievedMsg.recieversId === parseInt(req.params.id);
      });

      res.status(200).json({
        'status': 200,
        getAllMessages: getAllMessages
      });
    }
  }, {
    key: "getSpecificMail",
    value: function getSpecificMail(req, res) {
      var specificMessages = _message.default.find(function (specificMail) {
        return specificMail.messageId === parseInt(req.params.id);
      });

      res.status(200).json({
        'status': 200,
        specificMessages: specificMessages
      });
    } // static getAllUreadMessages(req, res) {
    //     const ureadMessages = (unreadMessages => ({
    //         (
    //  unreadMessages.status === 'unread' && unreadMessages.recieversId === parseInt(req.params.id)
    //         );
    //         res
    //             .status(200)
    //             .json({'status': 200, ureadMessages});
    //     }}

  }, {
    key: "getSentMessages",
    value: function getSentMessages(req, res) {
      var allsentMessagses = _message.default.filter(function (sentMessages) {
        return sentMessages.sendersId === parseInt(req.params.id);
      });

      res.status(200).json({
        'status': 200,
        allsentMessagses: allsentMessagses
      });
    }
  }, {
    key: "deleteAspecificMail",
    value: function deleteAspecificMail(req, res) {
      var messagetoDelete = _message.default.filter(function (specificMail) {
        return specificMail.messageId === parse(req.params.id);
      });

      _message.default.pop(messagetoDelete);

      res(200).json({
        'status': 200,
        'message': 'Message Deleted'
      });
    }
  }]);

  return MessageController;
}();

exports.default = MessageController;