const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mainRouter = require("./router/mainRouter");
const expresssission = require("express-session");
const expressfileuplode = require("express-fileupload")

app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressfileuplode());
app.use(expresssission({
    resave: false,
    saveUninitialized: false,
    secret: "nvjldshvjabdsvjk"
    
}))

app.use("/", mainRouter)

app.listen(3010, function(req, res){
    console.log("sarver started at port 3010");
})