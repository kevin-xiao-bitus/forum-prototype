const fs = require("fs");

fs.writeFile("./directory.json", JSON.stringify({idCount:0, Posts:[]}), e => {if (e) console.log(e)});
fs.rmSync("./posts", {
    recursive: true,
    force: true
});
fs.mkdir("./posts", e => {if (e) console.log(e)});