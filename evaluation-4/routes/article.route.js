const express=require('express');
const Article=require('../models/article');

const authMiddleware=require('../middlewares/auth');

const articleRouter=express.Router();

articleRouter.get('/articles',async(req,res)=>{
    try{
        const {page=1,limit=10,search}=req.body;

        const query=search?{$text:{$search:search}}:{};

        const article=await(Article.find(query)).skip((page-1)*limit)
        .limit(Number(limit));

        res.json(article);
       
    }catch(err){
     console.error(err.message);
     res.status(400).send('Server error')
    }
});


articleRouter.get('/articles/:id',async(req, res) => {
    try {
      const article = await Article.findById(req.params.id);
  
      if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
      }
  
      res.json(article);
    } catch (err) {
      console.error(err.message);
  
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Article not found' });
      }
  
      res.status(500).send('Server Error');
    }
  });


articleRouter.post('/articles/add', authMiddleware, async (req, res) => {
    try {
      const { title, body, category } = req.body;
  
      const article = new Article({
        title,
        body,
        user: req.user.id,
        category,
        live: false
      });
  
      const savedArticle = await article.save();
  
      res.json(savedArticle);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


articleRouter.put('/article/edit/:id',authMiddleware,async (req, res) => {
    try {
      const { title, body, category } = req.body;
  
      let article = await Article.findById(req.params.id);
  
      if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
      }
  
      if (article.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      article.title = title;
      article.body = body;
      article.category = category;
  
      const savedArticle = await article.save();
  
      res.json(savedArticle);
    } catch (err) {
      console.error(err.message);
  
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Article not found' });
      }
  
      res.status(500).send('Server Error');
    }
  });


articleRouter.delete('/articles/rem/:id', authMiddleware,async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
  
      if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
      }
  
      if (article.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      await article.remove();
  
      res.json({ msg: 'Article removed' });
    } catch (err) {
      console.error(err.message);
  
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Article not found' });
      }
  
      res.status(500).send('Server Error');
    }
  });


module.exports=articleRouter;