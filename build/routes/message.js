"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _message = _interopRequireDefault(require("../controllers/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _message.default.sendMessage);
router.get('/:id', _message.default.getAllMessages);
router.get('/unread', _message.default.getAllUreadMessages);
router.get('/sent', _message.default.getSentMessages);
router.get('/specific/:id', _message.default.getSpecificMail);
router.delete('/message/:id', _message.default.deleteAspecificMail);
var _default = router;
exports.default = _default;