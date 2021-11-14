const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n211q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db('doctors_portal');
        const appointmentsCollection = database.collection('appointments');

        app.get('/appointments', async (req, res)=>{
            const email = req.query.email;
            const date = new Date(req.query.date).toLocaleDateString();
            const query = {email: email, date: date};
            const cursor = appointmentsCollection.find(query);
            const appointments = await cursor.toArray();
            res.json(appointments);
        })

        app.post('/appointments', async (req,res)=>{
            const appointment = req.body;
            const result = await appointmentsCollection.insertOne(appointment);
            console.log(result);
            res.json(result);
        });
    }
    finally{

    }
}
run().catch(console.dir);
// console.log(uri);


app.get('/', (req, res) =>{
    res.send('Hello Doctors portal')
})
app.listen(port, ()=>{
    console.log(`listining ${port}`)
})
// app.get('/users')
// app.post('/users')
// app.get('/users/:id')
// app.put('/users/:id')
// app.delete('/users/:id')