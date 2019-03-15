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
router.get('/:id', _message.default.getAllMessages); // router.get('/unread',messageController.getAllUreadMessages);
// router.get('/sent',messageController.getSentMessages)
// router.get('/specific/:id',messageController.getSpecificMail);
// router.delete('/message/:id',messageController.deleteAspecificMail);

var _default = router;
exports.default = _default;