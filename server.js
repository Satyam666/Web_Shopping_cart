const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const path = require("path")
app.use(bodyParser.urlencoded({extended:false}))
let auth = require("D:\\Web cart\\Auth.js")
let mongofile = require("D:\\Web cart\\mongofile.js")


app.get("/", function(req, res){
    // res.end("Sever is here")
    res.render(path.join(__dirname, "/templates/login.hbs"))
})

// *** Check some loggin credentials by promise ***
app.post("/",  function(req, res) {
    // console.log("Username : ",req.body.username)
    // console.log("Password : ",req.body.pass)
    // *********
    
    auth.checkPass(req.body.email, req.body.password).then(()=>{
        // datac = auth.shoppingCart()
        // console.log("Username : ",req.body.email)
        // console.log("Password : ",req.body.password)
        // console.log("User is authorized")
        // res.render(path.join(__dirname, "/templates/shopping.hbs"), {ardata : datac})
        res.redirect("/shopping")
    }).catch(()=>{
        console.log("User is not authorized ")
        res.render(path.join(__dirname,"/templates/404.hbs"))
    })
})

app.get("/register", function(req, res){
    res.render(path.join(__dirname, "/templates/register.hbs"))
})

app.post("/register", function(req, res){
    // auth.registerUser(req.body.username, req.body.pass)
    mongofile.registermongo(req.body)
    res.render(path.join(__dirname, "/templates/login.hbs"))

})

// *** route to shopping cart ***
app.get("/shopping", function(req, res){
    if(auth.isLoggin()==true){
        datac = auth.shoppingCart()
        // console.log(datac)
        res.render(path.join(__dirname, "/templates/shopping.hbs"), {ardata : datac})
    }else{
        res.render(path.join(__dirname,"/templates/404.hbs"))
    }
    
})

// *** Logged out system but it has some bugs ***
app.get("/loggedOut", function(req, res){
    auth.loggedOut()
    res.render(path.join(__dirname, "/templates/login.hbs"))
})

// *** Adding items ***
app.get("/Items/:id",(req, res)=>{
    itemId = req.params.id
    auth.AddItem(itemId)
    res.redirect("/shopping")
})
app.get("/cart", (req, res)=>{
    data = auth.getCartItems()
    res.render(path.join(__dirname, "/templates/cart.hbs"), {arCart : data})

})

//*** remove items from cart ***
app.get("/removeItems/:id", (req, res)=>{
    idOfItem = req.params.id 
    auth.removeItem(idOfItem)
    res.redirect("/cart")
})

app.listen(8080)
console.log("Sever is running")