import express from "express";
import bodyParser from "body-parser";
import lowerCase from "lodash.lowercase";
const app = express();
const port = 3000;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


var journal=[];







app.get("/", (req, res) => {

  res.render("index.ejs",{journal:journal});
  
});


// post
app.get("/compose",(req,res)=>{
  
 
  res.render("pages/post.ejs")
})
app.post("/compose",(req,res)=>{
  const post ={title:req.body.title ,
    content:req.body.content} 
  journal.push(post);
  res.redirect("/",)
})

// viewpost

app.get("/post/:titleId", (req, res) => {
journal.forEach(article => {
  var articles = lowerCase(article.title)
  var param=lowerCase(req.params.titleId)
  if ( articles === param) {
    res.render("pages/viewpost.ejs",{title:article.title,content:article.content})
  }
});                                                                                   
})
app.get("/update/:titleId",(req,res)=>{
  journal.forEach(article => {
    var articles = lowerCase(article.title)
    var param=lowerCase(req.params.titleId)
    if ( articles === param) {
      res.render("pages/update.ejs",{
        title:article.title,
        content:article.content
      })
    }
  });
 
})
app.post("/update/:titleId",(req,res)=>{
  journal.forEach(article => {
    var articles = lowerCase(article.title)
    var param=lowerCase(req.params.titleId)
    if ( articles === param) {
      
     article.title=req.body.title;
     article.content=req.body.content,
     console.log("sucess");
       res.redirect("/",)
    }
  });

})

app.get("/post/delete/:titleId", (req, res) => {
  journal.forEach(article => {
    var articles = lowerCase(article.title)
    var param=lowerCase(req.params.titleId)
    if ( articles === param) {
      journal.pop(article)
      return res.redirect("/",)
    }
  }); 

  })

  app.get("/about", (req, res) => {
    res.render("pages/about.ejs");
  });
  
  app.get("/contact", (req, res) => {
    res.render("pages/contact.ejs");
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});