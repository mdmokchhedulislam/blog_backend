import express from 'express'
import dotenv from 'dotenv'
import db from './config/db.js';

const app = express()
dotenv.config();
db();
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('BLOG api')
})

app.listen(PORT, ()=>{
    console.log(`server is runnning port ${PORT}`);
    
})