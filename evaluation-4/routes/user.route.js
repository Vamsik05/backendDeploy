const express=require('express');
const  userRouter=express.Router();
const UserModel=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


userRouter.post('/register',async(req,res)=>{
    const {email,password,name,city,age}=req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new UserModel({email,password:hash,name,city,age});
      await user.save();
      res.status(200).json({'msg':"User registation successful"});
        });
    }catch(err){
      res.status(400).json({'err':err.message});
    }
})


userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email})
   if(user){
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            const token=jwt.sign({userID:user._id,user:user.email},'article')
           res.status(200).json({'msg':'Login successful',toke:token});
        }
        else{
            res.status(400).json('Wrong user credentials');
        }
    })
   }else{
       res.status(400).send('user not found in database');
         }
     }
    catch(err){
        res.status(400).json({'err':err.message});
    }
})

module.exports=userRouter