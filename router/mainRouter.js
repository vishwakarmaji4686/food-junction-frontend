const express = require("express")
const app = express()
const adminRouter = require("./admin/adminRouter")
const userRouter = require("./user/userRouter")

app.use("/", userRouter)
app.use("/admin", adminRouter)

module.exports = app;