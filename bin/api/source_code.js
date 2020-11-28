const express = require("express");
var fs = require('fs');
var cors = require('cors');
//initiate object

const app = express();
app.use(cors());
app.use(express.json())


function respon(status,data=null, code, message){
  return {
      status: status,
      data : data,
      code: code,
      message : message
   }
}

app.get("/source-code/:project_name", (req, res) => {  
    var filename = req.params.project_name;
    var filepath= `./bin/swaggerlist/${filename}.js`;
    var js = fs.readFileSync(filepath,'utf8');  //.split('\n').filter(Boolean)
    
    res.status(200).json(
      respon(true, js, 200, "success")
    )
    console.log(`view file ${filename}.js`);
});

app.post("/source-code/:project_name", (req, res) => { 
    var filename = req.params.project_name;
    var filepath= `./bin/swaggerlist/${filename}.js`;
     console.log(req.body);
    var data = req.body.join('\n'); //.join('\n')
    // console.log(data);
    fs.writeFile(filepath, data, function (err) {
      if (err) throw err;
      else {
          res.status(200).json(
            respon(true, null, 200, "file successfully updated")
          )
          console.log('Replaced!');
     }
    });
});

module.exports = app;