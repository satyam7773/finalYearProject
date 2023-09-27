const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
let port = process.env.PORT || 3000;

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env

// MONGO_URI =mongodb+srv://ramya1998:satyamramya@cluster0.1hwsh.mongodb.net/test

// const app = express();
// const app = express();
const app = express();
// const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: '100mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({limit: '50mb',parameterLimit: 100000,extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.text());
// Middleware
// app.use('/employees', () => {
//     console.log('Middleware Running');
// });

// Routes 
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });


// app.get('/employees', (req, res) => {
//     res.send('Employees');
// });

const connectDB = require('./config/db');
// Load Config
dotenv.config({path: './config/config.env'})

connectDB();
// Routes
app.use('/', require('./routes/index'));

app.listen(port);



