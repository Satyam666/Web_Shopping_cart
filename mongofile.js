// *** import required method or library ***
const mongoose = require("mongoose");
const { float } = require("webidl-conversions");
const schema = mongoose.Schema

// *** Creating new schema ***
const users = new schema ({
    "email":String ,
    "password":String
})

// *** 
let User;
function initialize (){
    db = mongoose.createConnection("mongodb+srv://satyam:<password>@cluster0.tbycgh2.mongodb.net/test")
    // console.log(mongo)
    return new Promise((resolve, reject) => {
        db.on('err',(err)=>{
            console.log("Error :",err)
            reject()
        })
        db.once('open', ()=>{
            User = db.model("users",users)
            console.log("User Schema has created")
            resolve()
        })
    })
   
}

function registermongo(userData){
    // console.log(userData)
    initialize().then(()=>{
        let user1 = new User(userData)
        console.log(user1)
        user1.save((err)=>{
            if(err){
                console.log("User is already present")
            }else if(err){
                console.log("User is created")
            }
        })
        .then(()=>{
            console.log("User is created")
        })
        .catch((err)=>{
            console.log("User is not created")
        })
    }).catch(()=>{
        console.log("Registeration is rejected")
    })
   
}

function getUsers(Email, Password){
    return new Promise((resolve, reject) => {
        initialize().then(()=>{
            User.find({email:Email}).exec().then((data)=>{
                // console.log(data[0])
                if(data[0].password==Password){
                    console.log("Login Successful")
                    resolve(true)
                    // return true
                }else{
                    console.log("login Unsuccessfull")
                    reject()
                    // return false
                }              
            })
            .catch((err)=>{

                reject(err)
            })
        })
    })
    
}

module.exports = {registermongo, getUsers}