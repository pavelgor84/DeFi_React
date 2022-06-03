const express = require("express");
const path = require("path");
const app = express();

// app.get("/", (req, res) => {
//     res.send("This is test")
// });

app.use(express.static("build"));

app.listen(443, () => {
    console.log("Server started on port 443")
});