const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/db');
require('./model/drugs');
require('dotenv').config();


const app = express();
app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api', require('./routers/drugs'))

//connect db
dbConnection()

//connect server
const PORT = process.env.PORT || 6000;
app.listen(PORT, ()=>console.log(`server running in PORT ${PORT}`));



