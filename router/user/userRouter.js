const express = require("express")
const app = express()

app.get("/", function(req, res){
    let page = {
        title : "home",
        pageName: "home"
    }
    res.render("user/template", page)
})
app.get("/login", function(req, res){
    let page = {
        title : "login",
        pageName: "login"
    }
    res.render("user/template", page)
});
app.get("/singUp", function(req, res){
    let page = {
        title : "singUp",
        pageName: "singUp"
    }
    res.render("user/template", page)
});
app.get("/cart", function(req, res){
    let page = {
        title : "cart",
        pageName: "cart"
    }
    res.render("user/template", page)
});
app.get("/foods", function(req, res){
    let page = {
        title : "foods",
        pageName: "foods"
    }
    res.render("user/template", page)
});

module.exports = app;