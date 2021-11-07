const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;


app.use(cors());


app.get('/', (req, res) =>{
    res.send('Hello Doctors portal')
})
app.listen(port, ()=>{
    console.log(`listining ${port}`)
})
