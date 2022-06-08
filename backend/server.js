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

const previewLength = 1500;

function getPostById(id, preview = false) {
    const dir = "./posts/" + id;
    var post = JSON.parse(fs.readFileSync(dir + "/post.json", {
        encoding: "utf-8"
    }));
    const buffer = fs.readFileSync(dir + "/content.txt", {
        encoding: "utf-8"
    });
    post.content = (preview) ? buffer.substring(0, previewLength) : buffer;
    if (!preview) {
        post.replies = JSON.parse(fs.readFileSync(dir + "/replies.json", {
            encoding: "utf-8"
        })).replies;
    }
    return post;
}

//console.log(getPostById(0, false))

server.post("/getPosts", (req, res) => {
    const query = req.body.keyword;
    let posts = [];
    if (query === "") {
        directory.Posts.forEach((id) => {
            posts.push(getPostById(id, true));
        })
        res.send(JSON.stringify(posts));
    }
    else {
        directory.Posts.forEach((id) => {
            let post = getPostById(id, false);
            let titleMatch = post.title.toLowerCase().indexOf(query);
            let contentMatch = post.content.toLowerCase().indexOf(query);
            let posterMatch = post.poster.toLowerCase().indexOf(query);
            if (!((titleMatch === -1) && (contentMatch === -1) && (posterMatch === -1))) {
                delete post.replies;
                post.content = post.content.substring(0, previewLength);
                posts.push(post);
            }
        });
        const responseData = JSON.stringify(posts);
        res.send(responseData);
    }
});

server.post("/uploadPost", (req, res) => {
    let data = req.body;
    data.id = directory.idCount++;
    const fullContent = data.content;

    delete data.content;
    let post = {...data};
    let replies = {replies: []};

    directory.Posts.push(data.id);
    async function setupFiles () {
        const dir = "./posts/" + data.id;
        fs.writeFileSync("./directory.json", JSON.stringify(directory), e => {
            if (e) console.log(e)
        });
        fs.mkdirSync(dir, e => {
            if (e) console.log(e)
        });
        fs.writeFileSync(dir + "/post.json", JSON.stringify(post), e => {
            if (e) console.log(e)
        });
        fs.writeFileSync(dir + "/content.txt", fullContent, e => {
            if (e) console.log(e);
        })
        fs.writeFileSync(dir + "/replies.json", JSON.stringify(replies), e => {
            if (e) console.log(e);
        });
    }
    setupFiles();
})

server.post("/getPostById", (req, res) => {
    const id = req.body.id;
    const post = getPostById(id, false);
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