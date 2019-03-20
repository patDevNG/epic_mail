"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../config/db"));

var _queries = _interopRequireDefault(require("../config/queries"));

var _schema = _interopRequireDefault(require("../model/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageController =
/*#__PURE__*/
function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var messageData, _ref, rows, rowCount, messageTableValue, insertMessage, inboxTableValue, populateInbox, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                messageData = {};
                messageData.subject = req.body.subject;
                messageData.subject = req.body.subject;
                messageData.message = req.body.message;
                messageData.parentmessageId = req.body.parentmessageId;
                messageData.status = req.body.status;
                messageData.recieversEmail = req.body.recieversEmail;
                messageData.sendersEmail = req.body.sendersEmail;
                messageData.createdOn = Date.now();
                console.log(messageData);
                _context.next = 13;
                return _db.default.query(_queries.default.checkIfUserExist, [messageData.recieversEmail]);

              case 13:
                _ref = _context.sent;
                rows = _ref.rows;
                rowCount = _ref.rowCount;

                if (!(rowCount === 0)) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  'status': 401,
                  'error': 'Email is invalid'
                }));

              case 20:
                if (!(messageData.sendersEmail && messageData.recieversEmail)) {
                  _context.next = 37;
                  break;
                }

                messageData.status = 'sent';
                messageTableValue = [messageData.subject, messageData.message, messageData.parentmessageId, messageData.status, messageData.sendersEmail];
                _context.next = 25;
                return _db.default.query(_queries.default.sendMessages, messageTableValue);

              case 25:
                insertMessage = _context.sent;
                console.log(insertMessage);

                if (!(insertMessage.rowCount === 1)) {
                  _context.next = 36;
                  break;
                }

                inboxTableValue = [insertMessage.rows[0].id, messageData.recieversEmail, 'unread'];
                _context.next = 31;
                return _db.default.query(_queries.default.populateInbox, inboxTableValue);

              case 31:
                populateInbox = _context.sent;
                data = {
                  subject: messageData.subject,
                  message: messageData.message,
                  parentmessageId: messageData.parentmessageId,
                  createdOn: messageData.createdOn,
                  status: messageData.status
                };
                return _context.abrupt("return", res.status(201).json({
                  'status': 201,
                  data: data
                }));

              case 36:
                return _context.abrupt("return", res.status(201).json({
                  'status': 201,
                  'message': 'message saved as draft'
                }));

              case 37:
                _context.next = 42;
                break;

              case 39:
                _context.prev = 39;
                _context.t0 = _context["catch"](0);
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', _context.t0);

              case 42:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 39]]);
      }));

      function sendMessage(_x, _x2) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }]);

  return MessageController;
}();

exports.default = MessageController;