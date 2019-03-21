import {Pool} from 'pg';
import dotnev from 'dotenv';

dotnev.config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'epicmail',
    password: '',
    port: 5432,
    // connectionString:process.env.DATABASE_URL
});
pool.on('connect',()=>{
    console.log('Connected to Database');
    
});
    export default{
        query(text, values) {
            return pool.query(text, values)
        }
    } 
 const createATable =(queryText)=>{
pool.query(queryText)
.then (result=>{
    // console.log(result);
    })
 .catch(err=>{
     console.log(err);
     
 });

}

const userQueryText =`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    firstName VARCHAR(200) NOT NULL,
    lastName VARCHAR(200) NOT NULL,
    country VARCHAR(200) NOT NULL,
    phoneNumber INTEGER NOT NULL,
    gender VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL

)`;

const messageQuery = ` CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    createdOn TIMESTAMP,
    subject TEXT,
    message TEXT,
    parentMessageId BIGINT REFERENCES messages(id),
    sendersEmail VARCHAR(200) REFERENCES users(email),
    status VARCHAR(200)
)`

const inbox = `CREATE TABLE IF NOT EXISTS inbox (
    inboxId SERIAL PRIMARY KEY NOT NULL UNIQUE,
    messageid BIGINT REFERENCES messages(id),
    receiversEmail VARCHAR(200) REFERENCES users(email),
    status VARCHAR(200)
)`;
const group = `CREATE TABLE IF NOT EXISTS groups (
groupid bigserial PRIMARY KEY UNIQUE NOT NULL,
name VARCHAR(200) NOT NULL,
createdon TIMESTAMP,
creator VARCHAR(200) REFERENCES users(email)
)`;
const groupMembers = `CREATE TABLE IF NOT EXISTS groupmembers (
groupmembersId  SERIAL NOT NULL PRIMARY KEY UNIQUE,
groupid bigserial REFERENCES groups(groupid) NOT NULL,
memberemail VARCHAR(200) REFERENCES users(email)

)`;

const dropTable = `DROP TABLE IF EXISTS users CASCADE`;
const dropTest = `DROP TABLE IF EXISTS tes CASCADE`;
const dropMessage = `DROP TABLE IF EXISTS messages CASCADE`;
const dropSent = `DROP TABLE IF EXISTS sent CASCADE`;
const dropInbox = `DROP TABLE IF EXISTS inbox CASCADE`;
const dropGroup = `DROP TABLE IF EXISTS groups CASCADE`;
const dropMemebers = `DROP TABLE IF EXISTS groupMembers CASCADE`;

createATable(userQueryText);
createATable(messageQuery);
createATable(inbox);
createATable(group)
createATable(groupMembers);







