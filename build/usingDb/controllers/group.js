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
  }, {
    key: "editGroupName",
    value: function () {
      var _editGroupName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var groupId, name, creator, evaluateCreator, _ref3, rows, rowCount, editGroupTableValue, _ref4, _rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                groupId = req.params.id;
                name = req.body.name;
                creator = req.body.creator;
                _context3.next = 5;
                return _db.default.query(_queries.default.checkGroupCreator, [creator, name]);

              case 5:
                evaluateCreator = _context3.sent;

                if (!(evaluateCreator.rowCount !== 1)) {
                  _context3.next = 10;
                  break;
                }

                res.status(403).json({
                  'status': 403,
                  'Message': 'You are not Authorize to Edit group name'
                });
                _context3.next = 25;
                break;

              case 10:
                _context3.next = 12;
                return _db.default.query(_queries.default.checkIfGroupExist, [name]);

              case 12:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                rowCount = _ref3.rowCount;

                if (!(rowCount > 0)) {
                  _context3.next = 19;
                  break;
                }

                res.status(401).json({
                  'status': 401,
                  'message': 'Group Name Already Exist Choose another Name'
                });
                _context3.next = 25;
                break;

              case 19:
                editGroupTableValue = [name, groupId, creator];
                _context3.next = 22;
                return _db.default.query(_queries.default.updateGroupName, editGroupTableValue);

              case 22:
                _ref4 = _context3.sent;
                _rows = _ref4.rows;
                return _context3.abrupt("return", res.status(201).json({
                  'status': 201,
                  'message': "Group name updated to ".concat(name)
                }));

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function editGroupName(_x5, _x6) {
        return _editGroupName.apply(this, arguments);
      }

      return editGroupName;
    }()
  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var groupId, email, evaluateCreator, deletedGroup;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                groupId = req.params.id;
                email = req.body.email;
                _context4.next = 4;
                return _db.default.query(_queries.default.checkIfGroupExistById, [groupId, email]);

              case 4:
                evaluateCreator = _context4.sent;

                if (!(evaluateCreator.rowCount !== 1)) {
                  _context4.next = 9;
                  break;
                }

                res.status(403).json({
                  'status': 403,
                  'message': 'You are not Authorized to delete Group'
                });
                _context4.next = 13;
                break;

              case 9:
                _context4.next = 11;
                return _db.default.query(_queries.default.deleteGroup, [groupId, email]);

              case 11:
                deletedGroup = _context4.sent;
                res.status(200).json({
                  'status': 200,
                  'Message': 'Group Successfully Deleted'
                });

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function deleteGroup(_x7, _x8) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }, {
    key: "addUserToGroup",
    value: function () {
      var _addUserToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var addedUser, evaluateGroup, evaluateUser, insertIntoGroup;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                addedUser = {};
                addedUser.groupId = req.body.groupId;
                addedUser.email = req.body.email;
                addedUser.addedon = Date.now();
                _context5.next = 7;
                return _db.default.query(_queries.default.checkIfGroupExistByOneValue, [addedUser.groupId]);

              case 7:
                evaluateGroup = _context5.sent;

                if (!(evaluateGroup.rowCount == 0)) {
                  _context5.next = 22;
                  break;
                }

                _context5.next = 11;
                return _db.default.query(_queries.default.checkIfUserExist, [addedUser.email]);

              case 11:
                evaluateUser = _context5.sent;

                if (!(evaluateUser.rowCount === 1)) {
                  _context5.next = 19;
                  break;
                }

                _context5.next = 15;
                return _db.default.query(_queries.default.insertUserIntoAGroup, [1, addedUser.email]);

              case 15:
                insertIntoGroup = _context5.sent;
                res.status(201).json({
                  'status': 201,
                  'Message': 'User Added Successfully'
                });
                _context5.next = 20;
                break;

              case 19:
                res.status(401).json({
                  'status': 401,
                  'message': 'User Cannot be found'
                });

              case 20:
                _context5.next = 22;
                break;

              case 22:
                res.status(401).json({
                  'status': 401,
                  'message': 'Group Does Not Exist'
                });
                _context5.next = 28;
                break;

              case 25:
                _context5.prev = 25;
                _context5.t0 = _context5["catch"](0);
                console.log("asaksnnnnnnnnnnnnnnnnndasdklnasdjnasdjlnasjd;lj;asdas", _context5.t0);

              case 28:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 25]]);
      }));

      function addUserToGroup(_x9, _x10) {
        return _addUserToGroup.apply(this, arguments);
      }

      return addUserToGroup;
    }()
  }]);

  return GroupControllers;
}();

exports.default = GroupControllers;