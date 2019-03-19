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
    console.log(result);
    })
 .catch(err=>{
     console.log(err);
     
 });

}

const userQueryText =`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(200) NOT NULL,
    lastName VARCHAR(200) NOT NULL,
    country VARCHAR(200) NOT NULL,
    phoneNumber INTEGER NOT NULL,
    gender VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL
)`

createATable(userQueryText);