const express = require("express");
const app = express();
const api = require('./modules/api/api.js');
var swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT || 5000;
app.use(api);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

//project myptm
const myptm = require('./modules/swaggerlist/myptm.js');
app.use(myptm.app);
var swaggerDocs = swaggerJsDoc(myptm.swaggerOptions);
app.use("/api-myptm", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//project logee
const logee = require('./modules/swaggerlist/logee.js');
app.use(logee.app);
var swaggerDocs = swaggerJsDoc(logee.swaggerOptions);
app.use("/api-logee", swaggerUi.serve, swaggerUi.setup(swaggerDocs));