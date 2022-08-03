const Employ=require('./model/employ')
const mongoose=require('mongoose')
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

// const p=new Employ({
// id:'1',
// name:'Shobhit',
// salary:10000,
// age:22
// })


// p.save().then(p=>{
// console.log(p)
// })
// .catch(e=>{
// console.log(e)
// })

const Employees=[
{
 
   name:'Anik',
   salary:1200,
   age:24
},
{
   
   name:'Shobhit',
   salary:23000,
   age:25
},
{
 
   name:'Rahul',
   salary:13000,
   age:26
},
{
   
   name:'Akshat',
   salary:26000,
   age:21
},


]

Employ.insertMany(Employees)
.then(res=>{
console.log(res)
})
.catch(e=>{
console.log(e);
})




