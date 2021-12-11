const express = require("express");
const request = require("request");
const axios = require("axios")
const app = express();

app.use(express.static('public'))

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};


app.get("/", function(req, res) {
    let ret = "vs-"
    let times = Math.random() * 6 + 4
    const func = () => ret = ret + Math.random().toString(36).substr(2, 5);
    Array.from({ length: times }, () => func());
    console.log(ret)
    res.json({
        req: ret,
        message: "nothing's currently here right now, try again later."
    })
})

app.use("/raw", function(req, res) {
    let url = req.query.url;
    let code;
    try{
    let buff = Buffer.from(data, 'base64');
    code = buff.toString('utf-8');
    }catch{return res.send(401, "I hate you.")}

    if (!isValidURL) return res.send(401, "Not allow.")
    if (!url.includes(code)) return res.send(401, "Unauthorize")
        res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    request(url, async function(error, response, body) {
        if (error) console.log(error)
        res.send(body)
    });
});

let listener = app.listen(8080, () => {
    console.log(
        "❗ Your app has restarted and is listening on port " +
        listener.address().port
    );
});
