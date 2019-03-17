import {Pool} from 'pg';
import dotnev from 'dotenv';

dotnev.config();

const pool = new Pool({
    connectionString:process.env.DATABASE_URL
});
pool.on('connect',()=>{
    console.log('Connected to Database');
    
});
