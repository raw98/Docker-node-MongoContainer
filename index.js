const bodyparser = require('body-parser')
const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors') ;
mongoose.connect('mongodb://rawand:rawand@localhost:27017/users?authSource=admin',{   useNewUrlParser: true,
useUnifiedTopology: true} ,(err) =>{
    if(err){
        console.log("error connection :( " + err)
    }
    else{
        console.log("coonection succeeed :D !")
    }

});

var app = express();
app.set('port', process.env.port ||3001);
app.use(cors());
app.use(bodyparser.json());
//shemas :)
var usersSchema = new mongoose.Schema(
    {   
         _id : mongoose.Types.ObjectId,
    
        firstName:{
            type : String
        },
        lastName:{
            type : String
        },
        email:{
            type : String
        },
        password:{
            type : String
        }
    },{ collection: 'users' }
    );
var Users = mongoose.model('Users', usersSchema,'users');

app.get('/', (req,res) => {
    res.send('hello beautiful');
});

///////////////////////////////////finf all /////////////////////////////////////
//find all
app.get('/users', (req,res) => {
    Users.find({} , (err,data)=>{
        if(err){
            res.send(err);
        }
        res.json(data);
    }

    );
});

app.listen(app.get('port'), ()=>{
    console.log('Express listen on  port 3000');
});