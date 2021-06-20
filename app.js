var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json())
// app.use(express.static('pubic'))
mongoose.connect('mongodb://localhost:27017/data',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
var db=mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to DB"));
db.once('open',()=>console.log("Connected to DB"));

app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var subject=req.body.subject;
    var message=req.body.message;
    var data={
                "name":name,
                "email":email,
                "subject":subject,
                "message":message
            }
            db.collection('users').insertOne(data,(err,collection)=>{
                if(err){
                    throw err;
                }
        console.log("Data Has been Recorded in Database Successfully");
    });
    return res.redirect('/index.html')
})
app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  var port = 3000;

app.listen(port, () => {
    console.log("Server listening on port " + port);
});