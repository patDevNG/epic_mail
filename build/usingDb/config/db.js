"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var pool = new _pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'epicmail',
  password: '',
  port: 5432 // connectionString:process.env.DATABASE_URL

});
pool.on('connect', function () {
  console.log('Connected to Database');
});
var _default = {
  query: function query(text, values) {
    return pool.query(text, values);
  }
};
exports.default = _default;

var createATable = function createATable(queryText) {
  pool.query(queryText).then(function (result) {// console.log(result);
  }).catch(function (err) {
    console.log(err);
  });
};

var userQueryText = "CREATE TABLE IF NOT EXISTS users(\n    id SERIAL PRIMARY KEY NOT NULL UNIQUE,\n    firstName VARCHAR(200) NOT NULL,\n    lastName VARCHAR(200) NOT NULL,\n    country VARCHAR(200) NOT NULL,\n    phoneNumber INTEGER NOT NULL,\n    gender VARCHAR(200) NOT NULL,\n    email VARCHAR(200) UNIQUE NOT NULL,\n    password VARCHAR(200) NOT NULL\n\n)";
var messageQuery = " CREATE TABLE IF NOT EXISTS messages(\n    id SERIAL PRIMARY KEY NOT NULL UNIQUE,\n    createdOn  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    subject TEXT,\n    message TEXT,\n    parentMessageId BIGINT REFERENCES messages(id),\n    status VARCHAR(200)\n)";
var inbox = "CREATE TABLE IF NOT EXISTS inbox (\n    inboxId SERIAL PRIMARY KEY NOT NULL UNIQUE,\n    messageid BIGINT REFERENCES messages(id),\n    receiversid VARCHAR(200) REFERENCES users(email),\n    status VARCHAR(200)\n)";
var sent = "CREATE TABLE IF NOT EXISTS sent (\n    sentid SERIAL PRIMARY KEY NOT NULL UNIQUE,\n    messageid BIGINT REFERENCES messages(id),\n    senderid VARCHAR(200) REFERENCES users(email)\n    \n)";
var group = "CREATE TABLE IF NOT EXISTS groups (\ngroupid bigserial PRIMARY KEY UNIQUE NOT NULL,\nname VARCHAR(200) NOT NULL,\ncreatedon TIMESTAMP DEFAULT NOW,\ncreator VARCHAR(200) REFERENCES users(email)\n)";
var groupMembers = "CREATE TABLE IF NOT EXISTS groupmembers (\ngroupmembersId  SERIAL NOT NULL PRIMARY KEY UNIQUE,\ngroupid bigserial REFERENCES groups(groupid) NOT NULL,\nmemberemail VARCHAR(200) REFERENCES users(email)\n\n)";
var dropTable = "DROP TABLE IF EXISTS users CASCADE";
var dropTest = "DROP TABLE IF EXISTS tes CASCADE";
var dropMessage = "DROP TABLE IF EXISTS messages CASCADE";
var dropSent = "DROP TABLE IF EXISTS sent CASCADE";
var dropInbox = "DROP TABLE IF EXISTS inbox CASCADE";
var dropGroup = "DROP TABLE IF EXISTS groups CASCADE";
var dropMemebers = "DROP TABLE IF EXISTS groupMembers CASCADE";
createATable(userQueryText);
createATable(dropInbox);
createATable(messageQuery);
createATable(inbox);
createATable(sent);
createATable(group);
createATable(groupMembers);