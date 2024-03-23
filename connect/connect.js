const mongoose = require("mongoose");

const connect = async(req,res) => {
    try {
        await mongoose.connect("mongodb+srv://minhad:64fy79ae@cluster0.nqf2sbd.mongodb.net/")
    .then(() =>{
        console.log("Connected");
    });
    } catch (error) {
        res.status(400).json({
            message: "Not Connected",
        });
    }
};

connect();