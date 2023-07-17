const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyparser =require("body-parser");

// mongoose connection
const mongoose = require("mongoose");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/registernow');}


const infoSchema = new mongoose.Schema({
    name: String,
    age: String,
    mobile: String,
    email: String,
    address: String,
    preference: String
  });

const userinfo = mongoose.model('information', infoSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.pug', params);
});

app.get('/register', (req, res)=>{
    const params = {}
    res.status(200).render('register.pug', params);
});

app.post('/register', (req, res)=>{
    var myInfo = new userinfo(req.body);
    myInfo.save().then(()=>{
        res.send("your info saved into database");
    }).catch(()=>{
        res.status(400).send("your info got into error");
    })
});

app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
});

app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});