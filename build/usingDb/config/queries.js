"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var queries = {};
queries.insertUsers = 'INSERT INTO users(firstName,lastName,country,phoneNumber,gender,email,password) VALUES($1,$2,$3,$4,$5,$6,$7)';
queries.checkIfUserExist = 'SELECT * FROM users where email = $1';
queries.sendMessages = 'INSERT INTO messages(createdOn,subject,message,parentmessageId,status) VALUES ($1,$2,$3,$4,$5)';
queries.inbox = 'INSERT INTO inbox(messageId,createdOn,recieversEmail) VALUES ($1,$2,$3)';
queries.sent = 'INSERT INTO sent (messageID,createdOn,sendersEmail) VALUES($1,$2,$3)';
queries.sendMessages = 'INSERT INTO messages(subject,message,parentMessageId,sendersEmail,status) VALUES($1,$2,$3,$4,$5) RETURNING id';
queries.populateInbox = 'INSERT INTO inbox(messageId,receiversEmail,status) VALUES ($1,$2,$3)';
queries.checkIfGroupExist = 'SELECT * FROM groups where name = $1';
queries.createGroup = 'INSERT INTO groups(name,createdon,creator) VALUES ($1,$2,$3)';
queries.getAllGroupInfo = 'SELECT * FROM groups';
queries.updateGroupName = 'UPDATE groups SET name = $1 WHERE groupid = $2 AND creator = $3';
queries.checkGroupCreator = 'SELECT *FROM groups WHERE creator = $1 AND name =$2';
queries.checkIfGroupExistById = 'SELECT *FROM groups WHERE groupid = $1 AND creator =$2';
queries.deleteGroup = 'DELETE  FROM groups WHERE groupid= $1 AND creator = $2 ';
queries.insertUserIntoAGroup = 'INSERT INTO groupmembers(groupid,memberemail) VALUES ($1,$2)';
queries.checkIfGroupExistByOneValue = 'SELECT *FROM groups WHERE groupid=$1';
queries.checkIfMemeberExistInGroup = 'SELECT *FROM groupmembers WHERE memberemail =$1';
var _default = queries;
exports.default = _default;