"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../config/db"));

var _queries = _interopRequireDefault(require("../config/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GroupControllers =
/*#__PURE__*/
function () {
  function GroupControllers() {
    _classCallCheck(this, GroupControllers);
  }

  _createClass(GroupControllers, null, [{
    key: "createGroup",
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var groupData, _ref, rowCount, groupTableData, createdGroup, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                groupData = {};
                groupData.name = req.body.name;
                groupData.createdOn = Date.now();
                groupData.creator = req.body.creator;
                console.log(groupData);
                _context.next = 8;
                return _db.default.query(_queries.default.checkIfGroupExist, [groupData.name]);

              case 8:
                _ref = _context.sent;
                rowCount = _ref.rowCount;

                if (!(rowCount === 0)) {
                  _context.next = 19;
                  break;
                }

                groupTableData = [groupData.name, groupData.createdon, groupData.creator];
                _context.next = 14;
                return _db.default.query(_queries.default.createGroup, groupTableData);

              case 14:
                createdGroup = _context.sent;
                data = {
                  groupName: groupData.name,
                  creator: groupData.creator
                };
                res.status(201).json({
                  'status': 201,
                  data: data,
                  'message': "".concat(groupData.name, " Created Successfully")
                });
                _context.next = 20;
                break;

              case 19:
                res.status(401).json({
                  'status': 401,
                  'Error': 'Group Already Exist'
                });

              case 20:
                _context.next = 24;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](0);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 22]]);
      }));

      function createGroup(_x, _x2) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "getAllGroupInfo",
    value: function () {
      var _getAllGroupInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _ref2, rows, rowCount, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _db.default.query(_queries.default.getAllGroupInfo);

              case 2:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                rowCount = _ref2.rowCount;

                if (rowCount === 0) {
                  res.status(400).json({
                    'status': 400,
                    'message': 'No Record'
                  });
                } else {
                  data = rows;
                  res.status(200).json({
                    'status': 200,
                    data: data
                  });
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllGroupInfo(_x3, _x4) {
        return _getAllGroupInfo.apply(this, arguments);
      }

      return getAllGroupInfo;
    }()
  }]);

  return GroupControllers;
}();

exports.default = GroupControllers;