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

server.post("/uploadPost", (req, res) => {
    const data = req.body;
    data.id = directory.idCount++;
    directory.Posts.push(data);
    fs.writeFile("./directory.json", JSON.stringify(directory), err => {
        if (err) {
            console.log(err);
        }
        else {
            /*TODO
            Make dir with post id
            have a reply json file
            store images
            */
            fs.mkdir(`./posts/${data.id}`, (err) => {
                if (err) console.log(err);
            });
            // TODO: make file;
            fs.appendFile(`./posts/${data.id}/replies.json`,"{}", (err) => {
                if (err) console.log(err);
            });
        }
    })
})

http.listen(port, () => {
    console.log("Server listening on port", port);
});