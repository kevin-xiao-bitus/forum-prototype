const express = require("express");
const port = 3001;
const server = express();
const bodyParser = require("body-parser");
const http = require("http").Server(server);
const cors = require("cors");
const directory = require("./directory.json");
const fs = require("fs");

server.use(bodyParser.json());
server.use(cors());

server.get("/getPosts", (req, res) => {
    const responseData = JSON.stringify(directory);
    res.send(responseData);
});

server.post("/uploadPost", (req, res) => {
    const data = req.body;
    directory.Posts.push(data);
    fs.writeFile("./directory.json", JSON.stringify(directory), err => {
        if (err) {
            console.log(err);
        }
    })
})

http.listen(port, () => {
    console.log("Server listening on port", port);
});