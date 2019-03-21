"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var queries = {};
queries.insertUsers = 'INSERT INTO users(firstName,lastName,country,phoneNumber,gender,email,password) VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING id';
queries.checkIfUserExist = 'SELECT * FROM users where email = $1';
queries.sendMessages = 'INSERT INTO messages(createdOn,subject,message,parentmessageId,status) VALUES ($1,$2,$3,$4,$5)';
queries.inbox = 'INSERT INTO inbox(messageId,recieversid,status) VALUES ($1,$2,$3)';
queries.sent = 'INSERT INTO sent (messageID,sendersid) VALUES($1,$2)';
queries.sendMessages = 'INSERT INTO messages(subject,message,parentMessageId,status) VALUES($1,$2,$3,$4) RETURNING id';
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
queries.fetchAllmessages = "SELECT messages.id, messages.createdon, messages.subject, messages.message, \ninboxes.receiverid, sents.senderid, messages.parentmessageid FROM messages INNER JOIN inboxes \nON messages.id = inboxes.messageid INNER JOIN sents ON sents.messageid = messages.id \nWHERE (sents.senderid = $1 OR inboxes.receiverid = $1) AND messages.id = $2";
var _default = queries;
exports.default = _default;