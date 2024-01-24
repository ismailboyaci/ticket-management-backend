const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const db = require('./config/db');
const Auth = require('./routes/auth');
const Ticket = require('./routes/ticket');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://fimple-bootcamp-final-case.vercel.app', 'http://investmentbank.localhost:50000'];
app.use(cors({
  origin: '*'
}));
app.use(cookieParser());
app.use(express.json({extended: true, limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

app.use('/', Auth);
app.use('/', Ticket);

const PORT = process.env.PORT || 5000;

db();


app.get('/', (req, res) => {
    res.json({message: "Hello World!, authControllers"});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
