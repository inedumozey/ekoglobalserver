const mongoose = require('mongoose');


const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/medstore";
const dbConnection =()=>{
    mongoose.connect(MONGODB_URL).then(()=>console.log("Sever connected!"))
}

module.exports = {dbConnection};