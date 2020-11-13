const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT || 5000;
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "3.0.0",
      title: "IOT API",
      description: "design your API",
      contact: {
        name: "Amazing Developerr"
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
/**
 * @swagger
 * /auth/login:
 *  post:
 *    description: login
 *    summary: login customer
 *    tags:
 *    - credential
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: Authorization
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *          example: Basic auth
 *      - in: body
 *        description: body
 *        schema:
 *          type: object
 *          properties:
 *            mobileNumber: 
 *              type: string
 *              example: 085858192789
 *            pin: 
 *              type: string
 *              example: 888888
 *    responses:
 *      '200':
 *        description: OK
 */
app.post("/auth/login",(req, res) => {
    res.status(200).json({
        success: true,
        data: { 
            "token": "xx" 
        },
        message: "successfully login",
        code: 200
    })
});
/**
 * @swagger
 * /auth/register:
 *  post:
 *    description: register customer
 *    summary: register customer
 *    tags:
 *    - credential
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: Authorization
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *          example: Basic auth
 *      - in: body
 *        description: body
 *        schema:
 *          type: object
 *          properties:
 *            name: 
 *              type: string
 *              example: pram
 *            mobileNumber: 
 *              type: string
 *              example: 085858192789
 *            pin: 
 *              type: string
 *              example: 888888
 *    responses:
 *      '200':
 *        description: OK
 */
app.post("/auth/register",(req, res) => {
    res.status(200).json({
        success: true,
        data: regis,
        message: "successfully registered",
        code: 200
    })
});
// Routes
/**
 * @swagger
 * /customers:
 *  post:
 *    description: Use to request all customerss
 *    summary: register customer
 *    tags:
 *    - profile
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: Authorization
 *        in: query
 *        description: Bearer Token
 *        required: true
 *        schema:
 *          type: string
 *          example: Bearer token
 *      - in: body
 *        description: body
 *        schema:
 *          $ref: '#/definitions/Puppy'
 *    responses:
 *      '200':
 *        description: OK
 */
app.post("/customers", (req, res) => {
  res.status(200).json({
      success: true,
      message: "customers successfully created",
      code: 201
  })
});
// Routes
/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customerss
 *    summary: get all customers
 *    tags:
 *    - profile
 *    parameters:
 *      - name: Authorization
 *        in: query
 *        description: Bearer Token
 *        required: true
 *        schema:
 *          type: string
 *          example: Bearer token
 *    responses:
 *      '200':
 *        description: OK
 */
app.get("/customers", (req, res) => {
  res.status(200).json({
      success: true,
      data: customers,
      message: "list customers",
      code: 200
  })
});
/**
 * @swagger
 * /customers/{id}:
 *    put:
 *      description: Use to return customers by id
 *      summary: get detail customer
 *      tags:
 *      - profile
 *      parameters:
 *      - name: id
 *        in: path
 *        descriptions: use to return
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *          example: 1
 *      responses:
 *        200:
 *         description: OK
 */
app.put("/customers/:id", (req, res) => {
  res.status(200).json({
    success: true,
    data: { 
        id: req.params.id,
        name: 'pram',
        gender: 'male',
        hobby: 'footbal'
    },
    message: 'detail customer',
    code: 200
  })
});
var regis = {
     id: '289ueue-2782eh-38383',
     name: 'pram'
    }
var customers = [
  {
    id: '1',
    name: 'pram',
    gender: 'male',
    hobby: 'footbal'
  },
  {
    id: '2',
    name: 'pram',
    gender: 'male',
    hobby: 'footbal'
  }
]
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
 *       gender:
 *         type: string
 *         example: male
 */

 
 
 
 
 
 