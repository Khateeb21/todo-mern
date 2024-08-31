const express=require('express')
const app=express()
const cors= require('cors')
require('./connection/conn.js')
const auth=require('./routes/auth.js')
const sign=require('./routes/signin.js')
const list=require('./routes/list.js')
const path = require("path");
app.use(express.json())
app.use(cors())
app.use('/api/v1',auth)
app.use('/api/v1',sign)
app.use('/api/v2',list)

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
app.listen(3000,()=>{

console.log('server listening on 3000')


})