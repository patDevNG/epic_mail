"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../config/db"));

var _queries = _interopRequireDefault(require("../config/queries"));

var _schema = _interopRequireDefault(require("../model/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
        var validateMessage, _req$body, receiversEmail, subject, message, senderId, evaluateEmail, receiversid, createdOn, messageToInsert, populateMessageTable, messageId, sentMessageValues, inboxMessageValue, insertSent, insertInbox;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                validateMessage = _schema.default.message(req.body);

                if (!(validateMessage.error === null)) {
                  _context.next = 30;
                  break;
                }

                _req$body = req.body, receiversEmail = _req$body.receiversEmail, subject = _req$body.subject, message = _req$body.message;
                senderId = req.user.id;
                _context.next = 7;
                return _db.default.query(_queries.default.checkIfUserExist, [receiversEmail]);

              case 7:
                evaluateEmail = _context.sent;

                if (!(evaluateEmail.rowCount !== 1)) {
                  _context.next = 12;
                  break;
                }

                res.status(500).json({
                  'status': 500,
                  'message': 'Invalid Email'
                });
                _context.next = 28;
                break;

              case 12:
                receiversid = evaluateEmail.rows[0].id;
                createdOn = moment(new Date());
                messageToInsert = [subject, message, createdOn, 'sent'];
                _context.next = 17;
                return _db.default.query(_queries.default.sendMessages, messageToInsert);

              case 17:
                populateMessageTable = _context.sent;
                messageId = populateMessageTable.rows[0].id;
                sentMessageValues = [messageId, senderId];
                inboxMessageValue = [messageId, receiversid, status];
                _context.next = 23;
                return _db.default.query(_queries.default.sent, sentMessageValues);

              case 23:
                insertSent = _context.sent;
                _context.next = 26;
                return _db.default.query(_queries.default.inbox, inboxMessageValue);

              case 26:
                insertInbox = _context.sent;
                res.status(201).json({
                  status: 200,
                  data: [{
                    id: messageId,
                    createdOn: createdOn,
                    subject: subject,
                    message: message,
                    parentMessageId: null,
                    status: 'sent'
                  }]
                });

              case 28:
                _context.next = 31;
                break;

              case 30:
                res.status(401).json({
                  'status': 400,
                  'message': 'Invalid Input'
                });

              case 31:
                _context.next = 35;
                break;

              case 33:
                _context.prev = 33;
                _context.t0 = _context["catch"](0);

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 33]]);
      }));

      function sendMessage(_x, _x2) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }, {
    key: "getAllMessages",
    value: function () {
      var _getAllMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var userId, messageId, validateNumber, allMessages, rows;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                userId = req.user.id;
                messageId = req.params.messageId;
                validateNumber = _schema.default.validateNumber(messageId);

                if (!(validateNumber.error === null)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 7;
                return _db.default.query(_queries.default.fetchAllmessages, [userId, messageId]);

              case 7:
                allMessages = _context2.sent;
                rows = allMessages.rows;

                if (rows.length) {
                  res.status(401).json({
                    status: 401,
                    Message: 'No New Message for the logged in User'
                  });
                } else {
                  res.status(200).json({
                    status: 200,
                    data: _toConsumableArray(rows),
                    success: true
                  });
                }

                _context2.next = 13;
                break;

              case 12:
                res.status(400).json({
                  status: 400,
                  error: 'Invalid Parameters Parsed'
                });

              case 13:
                _context2.next = 17;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 15]]);
      }));

      function getAllMessages(_x3, _x4) {
        return _getAllMessages.apply(this, arguments);
      }

      return getAllMessages;
    }()
  }]);

  return MessageController;
}();

exports.default = MessageController;