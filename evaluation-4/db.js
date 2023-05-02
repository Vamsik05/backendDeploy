const mongoose=require('mongoose');
require('dotenv').config();
const port=process.env.PORT ||7000;

const connection=mongoose.connect(process.env.mongoURl)
.then(()=>{
  console.log("connected to mongoDB")
})
.catch((err)=>{
    console.log(err)
});


module.exports={connection,port};