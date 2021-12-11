const express = require("express");
const request = require("request");
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
    res.status(404).json({
        req: ret,
        message: "Error 404"
    })
})

app.use("/raw", function(req, res) {
    let url = req.query.url;
    let pcode = req.query.code;
    let code;
    try{
    let buff = Buffer.from(pcode, 'base64');
    code = buff.toString('utf-8');
    }catch{return res.status(401).send("I hate you.")}

    if (!isValidURL) return res.status(401).send("Not allow.")
    if (!url.includes(code)) return res.status(401).send("Unauthorize")
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
