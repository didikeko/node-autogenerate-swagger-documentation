const express = require("express")
var fs = require('fs')
var cors = require('cors')
var validate = require('jsonschema').validate;;
const app = express()
// var v = new Validator();
app.use(cors())
app.use(express.json())
const pathfiledata = './bin/filedata/users.json';



function respon(status,data=null, code, message){
    return {
        status: status,
        data : data,
        code: code,
        message : message
     }
  }

function pushitemjson(item){
    fs.readFile(pathfiledata, 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            var file = JSON.parse(data);
            file.push(item);
     
            var json = JSON.stringify(file, undefined, 2);
     
            fs.writeFile(pathfiledata, json, 'utf8', function(err){
                 if(err){ 
                       console.log(err+'user failed to push on filedata'); 
                 } 
                });
        }
     
     });
}

app.post("/register", (req, res) => {  

    pushitemjson(req.body)
    res.status(200).json(
      respon(true, null, 200, "register success")
    )
    
});

module.exports = app;