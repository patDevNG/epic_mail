"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _message = _interopRequireDefault(require("../controllers/message"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _auth.default.verifyToken, _message.default.sendMessage);
router.get('/', _auth.default.verifyToken, _message.default.getAllMessages);
router.get('/messages/unread', _auth.default.verifyToken, _message.default.getAllUnreadMessages);
router.get('/messages/sent', _auth.default.verifyToken, _message.default.getSentMails);
router.get('/messages/inbox', _auth.default.verifyToken, _message.default.getAllInboxMessages);
router.delete('/messages/:id', _auth.default.verifyToken, _message.default.deleteMessage);
var _default = router;
exports.default = _default;