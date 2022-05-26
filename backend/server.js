const express = require("express");
const port = 3001;
const server = express();
const bodyParser = require("body-parser");
const http = require("http").Server(server);
const cors = require("cors");
const directory = require("./directory.json");

server.use(bodyParser.json());
server.use(cors());

server.get("/getPosts", (req, res) => {
    console.log("received request");
    const responseData = JSON.stringify(directory);
    res.send(responseData);
});

server.post("/uploadPost", (req, res) => {
    const data = req.body;
    console.log(data);
})

http.listen(port, () => {
    console.log("Server listening on port", port);
});