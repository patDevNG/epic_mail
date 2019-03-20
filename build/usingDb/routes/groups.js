"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _group = _interopRequireDefault(require("../controllers/group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _group.default.createGroup);
router.get('/', _group.default.getAllGroupInfo);
var _default = router;
exports.default = _default;