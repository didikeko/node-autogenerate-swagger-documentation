const express = require("express");
const app = express();
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0",
        title: "UGM API",
        description: "UGM API",
        contact: {
          name: "ugm@gmail.com"
        },
        servers: ["http://localhost:5000/api-ugm"]
      }
    },
    // ['.routes/*.js']
    definitions: {},
    apis: ["./bin/swaggerlist/api-ugm.js"]
  };
// Routes
/**
 * @swagger
	 * /api-ugm/customers:
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
app.post("/api-ugm/customers", (req, res) => {
  res.status(200).json({
      success: true,
      message: "customers successfully created",
      code: 201
  })
});
// Routes
/**
 * @swagger
 * /api-ugm/customers:
 *  get:
 *    description: Use to request all customerss
 *    summary: get all customers
 *    tags:
 *    - profile
 *    security:
 *    - bearerAuth: []
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
app.get("/api-ugm/customers", (req, res) => {
  res.status(200).json({
      success: true,
      data: customers,
      message: "list customers",
      code: 200
  })
});
/**
 * @swagger
 * /api-ugm/customers/{id}:
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
 * securityDefinitions:
 *  basicAuth:     
 *    type: basic
 *    description: "user: telkom, password : da1c25d8-37c8-41b1-afe2-42dd4825bfea"
 *  bearerAuth:
 *    type: http
 *    schema: bearer
 *    description: "Bearer Token"
 *    bearerFormat: JWT
 * security:
 *  - BasicAuth: []
 */
app.put("/api-ugm/customers/:id", (req, res) => {
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
 * 
 * 
 */
 module.exports = { app, swaggerOptions };