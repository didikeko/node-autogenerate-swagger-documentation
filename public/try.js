/* 
 * Author : Didik Eko Pramonno
 */
const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT || 5000;
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customers APIS",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  definitions: {},
  apis: ["app.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customerss
 *    parameters:
 *      - name: cob
 *        in: query
 *        descriptions: use to return
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Puppy'
 */
app.get("/customers", (req, res) => {
  res.status(200).send("Customer results");
});
/**
 * @swagger
 * /customers/{cob}:
 *    put:
 *      description: Use to return all customers
 *      parameters:
 *      - name: cob
 *        in: path
 *        descriptions: use to return
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      responses:
 *        200:
 *         description: success
 */
var ini = [
  {
    lala: '1'
  },
  {
    lala: '2'
  }
]
app.put("/customers/:cob", (req, res) => {
  res.status(200).json({
    id: req.params.cob,
    data: {
      location: "wonogiti"
    },
    lala: ini
  })
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
/**
 * @swagger
 * definitions:
 *   Puppy:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: nncc
 *       breed:
 *         type: string
 *         example: dd
 */