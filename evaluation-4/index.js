const express=require('express');
require('dotenv').config();
const {connection,port}=require('./db');
const limiter=require('./middlewares/rateLimiter');
const userRouter=require('./routes/user.route');
const articleRouter=require('./routes/article.route');

const app=express();

app.use(express.json());

app.use('/',limiter);

app.use('/',userRouter);

app.use('/',articleRouter);



app.listen(port,async()=>{
    try{
    connection
    console.log('connected to dataBase')
    }
    catch(err){
        console.log(err)
    }
    console.log(`Server is running at port: ${port}`)
})
