const mongoose=require('mongoose');

const articleSchema=new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    user:{type:String,required:true},
    userID:{type:String},
    category:{type:String},
    live:{type:Boolean,defult:false}
})

   const ArticleModel=mongoose.model('Article',articleSchema)

module.exports=ArticleModel;