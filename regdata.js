var express =require("express");
var path=require("path");
var bodyParser=require("body-parser");
var app = express();
var mysql=require('mysql');
const encoder = bodyParser.urlencoded();
//bus kar abhi
app.use(bodyParser.urlencoded({extended:true}));

var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Deathnote",
    database:"VIcon"
});
app.listen(process.env.PORT || 3000,function(){
    console.log("VIcon listening at port 3000")
});
//path of directory
const register=path.join(__dirname,"../VIconr/register.html");
const registerCss=path.join(__dirname,"../VIconr/register.css");
const login=path.join(__dirname,"../VIconr/login.html");
const loginCss=path.join(__dirname,"../VIconr/login.css");
//uses of directory
app.use(express.static(register));
app.use("/register.css",express.static(registerCss));
app.use(express.static(login));
app.use("/login.css",express.static(loginCss));
// applinging
app.get("/",function(req,res){
    res.sendFile(register);
});
app.post("/register",function(req,res){
    // var email=req.body.email;
    var person={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    };
    connection.query('INSERT INTO register SET ?',person,function(err,result){
        if (err) throw err;
        res.sendFile(login);
    });
});
connection.connect(function(err){
    if (err) throw err;
    else 
    console.log("connected to the database successfully!");
});


app.get("/",function(req,res){
    res.sendFile(login);
})
app.get("/login.html",function(req,res){
    res.sendFile(login);
})
app.post("/",encoder,function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    connection.query("select * from register where  email = ? and password = ?",[email,password],function(error,
        results,fields){
            console.log(results);
            if (results.length > 0) {
                res.redirect("https://viconp.herokuapp.com/action.html");
            }
             else {
                res.send("PLEASE ENTER VALID EMAIL AND PASSWORD");
            }
            res.end();
        });
    });
    
