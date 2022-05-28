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

server.post("/getPosts", (req, res) => {
    const query = req.body.keyword;
    const posts = directory.Posts;
    if (query === "") {
        res.send(JSON.stringify(directory));
    }
    else {
        let results = {Posts: []};
        posts.forEach((post) => {
            let titleMatch = post.title.toLowerCase().indexOf(query);
            let contentMatch = post.content.toLowerCase().indexOf(query);
            let posterMatch = post.poster.toLowerCase().indexOf(query);
            if (!((titleMatch === -1) && (contentMatch === -1) && (posterMatch === -1))) {
                results.Posts.push(post);
            }
        });
        const responseData = JSON.stringify(results);
        res.send(responseData);
    }
});

const previewLength = 1500;

server.post("/uploadPost", (req, res) => {
    const data = req.body;
    data.id = directory.idCount++;
    let previewPost = {...data};
    if (previewPost.content.length > previewLength) {
        previewPost.content = previewPost.content.substring(0, previewLength);
    }
    directory.Posts.push(previewPost);

    let fullPost = {...data};
    fullPost.replies = [];

    async function setupFiles () {
        fs.writeFileSync("./directory.json", JSON.stringify(directory), e => {
            if (e) console.log(e)});
        fs.mkdirSync(`./posts/${data.id}`, e => {
            if (e) console.log(e)});
        fs.writeFileSync(`./posts/${data.id}/post.json`, JSON.stringify(fullPost), e => {
            if (e) console.log(e)});
    }
    setupFiles();
})

server.post("/getPostById", (req, res) => {
    const id = req.body.id;
    const post = fs.readFileSync(`./posts/${id}/post.json`, {
        encoding: "utf-8"
    });
    if (post) {
        const responseData = post;
        res.send(responseData);
    }
    else {
        console.log("not found");
        res.sendStatus(500);
    }
});

http.listen(port, () => {
    console.log("Server listening on port", port);
});