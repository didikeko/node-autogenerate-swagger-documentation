const express = require("express");
var fs = require('fs');
var cors = require('cors');
//initiate object

const app = express();
app.use(cors());
app.use(express.json())

const pathfiledata = './bin/filedata/project.json';
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
                       console.log(err+'item failed to push on filedata'); 
                 } else {
                       console.log("item successfully push on filedata")
                 }});
        }
     
     });
}

app.get('/project', (req, res) => {
    fs.readFile(pathfiledata, 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            var file = JSON.parse(data);

            res.status(200).json(
                respon(true, file, 200, "list project")
            )
            
        }
     
     });
})

app.post("/project", (req, res) => {  
      

    var filename = req.body.project_name;
    var filepath= `./bin/swaggerlist/${filename}.js`;
    try {
        if (fs.existsSync(filepath)) {
          //file exists
            res.status(200).json(
                respon(false, null, 409, `project ${filename} is exist , so please fill other project name`)
            )
        } else{
            var version     = `        version: "${req.body.version}",`;
            var title       = `        title: "${req.body.title}",`;
            var description = `        description: "${req.body.description}",`;
            var contact     = `          name: "${req.body.contacts}"`;
            var servers     = `        servers: ["http://localhost:5000/${req.body.project_name}"]`;
            var apis        = `    apis: ["./bin/swaggerlist/${req.body.project_name}.js"]`;
            
            
            var filepathtemplate= './bin/swaggerlist/api-template.js';
            var template    = fs.readFileSync(filepathtemplate,'utf8').split('\n');  //.split('\n').filter(Boolean);
            
            template[6] = version;
            template[7] = title;
            template[8] = description;
            template[10]= contact;
            template[12]= servers;
            template[17]= apis;
            template[22] = `	 * /${req.body.project_name}/customers:`;
            template[46] = `app.post(\"/${req.body.project_name}/customers\", (req, res) => {`;
            template[56] = ` * /${req.body.project_name}/customers:`;
            template[76] = `app.get(\"/${req.body.project_name}/customers\", (req, res) => {`;
            template[86] = ` * /${req.body.project_name}/customers/{id}:`;
            template[116] = `app.put(\"/${req.body.project_name}/customers/:id\", (req, res) => {`;
            console.log(template);
            
            
            fs.writeFile(filepath, template.join('\n'), function (err) {
            if (err) throw err;
            else {
                res.status(200).json(
                    respon(true, null, 201, "project successfully created")
                )
                pushitemjson(req.body);
                console.log(`Project ${req.body.project_name} successfully created!`);
            }
            });
            
            console.log(`file ${filename} does'nt exist , so template for ${filename} was created`);
        }
      } catch(err) {
        console.error('err')
      }

        


});

module.exports = app;