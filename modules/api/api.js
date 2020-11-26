var http = require('http');
var fs = require('fs');
var path = require('path');
const express = require("express");
const app = express();
var serveStatic = require('serve-static')
var nodeBase64 = require('nodejs-base64-converter');
const readline = require('readline');
var cors = require('cors');
const bodyParser = require('body-parser');
const { resolve } = require('path');


app.use(cors());
app.use(express.json())

// function getStandardResponse(status,message,data){
//     return {
//         status: status,
//         message : message,
//         data : data
//      }
// }

var js = fs.readFileSync('./modules/swaggerlist/myptm.js','utf8').split('\n').filter(Boolean);
app.get("/readfile", (req, res) => {
  res.status(200).json({
    success: true,
    data: js,
    message: "file",
    code: 200
  })
});
app.post("/append", (req, res) => {
    var x = req.body.join('\n');
    // console.log(x);
    fs.writeFile('./modules/swaggerlist/myptm.js', x, function (err) {
      if (err) throw err;
      else {
          res.status(200).json({
            success: true,
            message: "file success updated",
            code: 200
           })
          console.log('Replaced!');
     }
    });
});

module.exports = app;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });