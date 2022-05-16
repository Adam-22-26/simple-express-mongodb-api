const express = require('express')
const Cors = require("cors")
const apiRouter = require('./api')
const app = express()

app.use(Cors())
app.use(express.urlencoded())
app.use(express.json())
app.get("/", (req, res)=>{
    res.status(200)
    res.send({data: "hello world"})
})

app.use(apiRouter)

app.listen(process.env.PORT ||5000)