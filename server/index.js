import express from "express";
import * as score_data from './score_crud.js';

// init app
const port = process.env.PORT || 8080;
const app = express();

//middleware so express can read post requests with body of json format
app.use(express.json());

//test if port is connected to app
app.get("/", async (req, res) => {
    res.send("Hello World!");
});

//read  the user with given id from database
app.get("/getUser", async (req, res) => {
    if(req.query.id !== undefined){
        let user = await score_data.readUser(req.query.id);
        res.status(200).json(user);
    } else{
        res.status(400).json({message: "No id specified"});
    }
    res.end();
});

//read all users from database
app.get("/getAllUsers", async(req, res) => {
    if(req.body !== undefined){
        const users = await score_data.readAllUsers();
        res.status(200).json(users);
    } else{
        res.status(400).send('Bad Request');
    }
});

//create a new user of given id
app.post("/saveUser", async(req, res) => {
    console.log("body: " , req.body);
    if(req.body !== undefined && req.body.id !== undefined){
        let response = await score_data.createUser(req.body.id);
        console.log(response);
        res.status(200).send('OK');
    } else{
        res.status(400).json({"error": 'no id'});
    }
});

//update user score given id and new score
app.put("/updateScore", async(req, res) => {
    if(req.body !== undefined && req.body.id !== undefined && req.body.score !== undefined){
        const response = await score_data.updateUser(req.body.id, req.body.score);
        console.log(response);
        res.status(200).send('OK');
    } else{
        res.status(400).json({'error': 'missing parameters'});
    }
});

//delete user with given id
app.delete("/deleteUser", async(req, res) => {
    if(req.body !== undefined && req.body.id !== undefined){
        let response = await score_data.deleteUser(req.body.id);
        res.status(200).json(response);
    } else {
        res.status(400).send('Bad Request');
    }
});

// start server listening at port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});