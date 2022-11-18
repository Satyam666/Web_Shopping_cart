const fs = require("fs")
const { retry } = require("statuses")
let login = false
let mongofile = require("D:\\Web cart\\mongofile.js")
let cartArray = []
function checkPass(user, pass){
    // let data = require("D:\\Web cart\\db.json")
    // console.log(data)
    // if(data[user]===pass){
    //     console.log("User Authenticated")
    //     login = true
    //     return true
    // }else{
    //     console.log("User not Authenticated")
    //     return false
    // }
    login = true
    
    return mongofile.getUsers(user, pass)   
}

function registerUser(data){
    // let data = require("D:\\Web cart\\db.json")
    mongo.registermongo(data)
    // data[user]=pass
    // let js = JSON.stringify(data)
    // fs.writeFileSync("db.json", js)
}

function shoppingCart(){
    data1 = require("D:\\Web cart\\info.json")
    // console.log(data1.data[0])
    data = data1.data
    return data1.data
}
function isLoggin(){
    return login
}
function loggedOut(){
    login = false
}
function getCartItems(){
    return cartArray
}
function AddItem(Id){
    for(let i=0; i<data.length; i++){
        if(data[i].id==Id){
            cartArray.push(data[i])
        }
    }
    console.log(cartArray)
    console.log(Id)
}
function removeItem(Id){
    for(let i=0; i<data.length; i++){
        if(data[i].id==Id){
            cartArray.splice(i,1)
        }
    }
}
// shoppingCart()
module.exports = {checkPass, registerUser, shoppingCart, isLoggin, loggedOut, AddItem, getCartItems, removeItem}