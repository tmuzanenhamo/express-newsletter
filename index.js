const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express()
const PORT = 3000;
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extened: true}))

app.get('/', (req, res) =>{
    res.sendFile(__dirname+'/signup.html');
})

app.post('/', (req, res) =>{
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email

    console.log(fname)
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log('Listening')
})