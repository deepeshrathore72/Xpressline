const mongoose = require("mongoose");
require('dotenv').config()
async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = dbConnect;
