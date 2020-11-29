const fs = require('fs');
const express = require("express");
var swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const auth = require('./bin/api/auth.js');
const register = require('./bin/api/register.js');
const project = require('./bin/api/project.js');
const source_code = require('./bin/api/source_code.js');

const app = express();
const port = process.env.PORT || 5000;

app.use('/v1', auth);
app.use('/v1', register);
app.use('/v1',source_code);
app.use('/v1',project);

fs.readFile('./bin/filedata/project.json', (err, data) => {
    if (err) throw console.log(err);
    let project = JSON.parse(data);
    
    for (i in project){

      console.log(project[i].project_name);
      var filename = require(`./bin/swaggerlist/${project[i].project_name}.js`);
      app.use(filename.app);
      var swaggerDocs = swaggerJsDoc(filename.swaggerOptions);
      app.use(`/${project[i].project_name}`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});





