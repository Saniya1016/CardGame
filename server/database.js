//require mongoose module
// const mongoose = require("mongoose");
import mongoose from 'mongoose';

//get the uri from MongoDB
const uri = "mongodb+srv://saniyasingh:Awesome2023@cluster1.3te1e56.mongodb.net/";

//setup Database connection handle any errors
async function connect(){
    try{
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to MongoDB");
    } catch(error){
        console.error(error);
    }
}

//connect to Database
connect();

//Define Score Schema for the game
const scoreSchema = new mongoose.Schema(
    { _id: String, score: [Number] }
);

//Define Score model
const Score = mongoose.model('scores', scoreSchema);

//create collection of model
Score.createCollection().then(function (collection){
    console.log("Collection for scores is created");    
});

export {Score};