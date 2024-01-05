const mongoose = require("mongoose");

function DBConnection() { 
    const DB_URL = process.env.MONGO_URL;

    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection Error !! "));
    db.once("open", function () { 
        console.log("DB Connected ");
    });
}

module.exports = DBConnection; // by exporting this fn we could call this fn when ever we want the DB connection