const express=require('express');
const app=express();
const path=require('path')
const mongoose = require("mongoose");
const catchasync=require('./utilis/catchasync')
const expresserror=require('./utilis/expresserror')
const Employ=require('./model/employ')
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");


const dbUrl="mongodb://127.0.0.1:27017/Employ";
// mongodb://127.0.0.1:27017/yelp-camp
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify:false
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Database Connected");
});

app.engine('ejs', ejsMate)
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,'public')));




app.get('/home',(req,res)=>{
res.send('home')

})


app.get('/employs',async(req,res)=>{
const employs=await Employ.find({})
//console.log(employs)
// res.send('ALL EMPLOYEES');
res.render('./index',{employs})
})


app.get('/employs/new',async(req,res)=>{
  res.render('./new')

})

app.post('/employs',async(req,res)=>{
  const newemploye=new Employ(req.body);
await newemploye.save();

   console.log(req.body);
  //res.send('new employ registered')
 res.redirect(`/employ/${newemploye._id}`)

})

app.get('/employ/:id',async(req,res)=>{
  const {id}=req.params;
 const employ= await Employ.findById(id);
//console.log(employ)
res.render('./show',{employ})
})


app.get('/employ/:id/edit',async(req,res)=>{
 const {id}=req.params;
  const employ= await Employ.findById(id);
  res.render('./edit',{employ})

})

app.put('/employ/:id',async(req,res)=>{
const {id}=req.params;
 const employ= await Employ.findByIdAndUpdate(id,

req.body);
res.redirect(`/employ/${employ._id}`)
})

app.delete('/employ/:id',async(req,res)=>{
const {id}=req.params;
await Employ.findByIdAndDelete(id);
res.redirect('/employs')
})

app.all('*', (req, res, next) => {
    next(new expresserror('Page Not Found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


app.listen(3000,()=>{
console.log('APP IS LISTENING ON PORT 3000')
})