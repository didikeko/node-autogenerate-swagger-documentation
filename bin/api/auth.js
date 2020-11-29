const express = require("express")
var fs = require('fs')
var cors = require('cors')

//initiate object
const app = express()
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
function auth(headerauth){
    var authorization = headerauth
    console.log(authorization);

    var userpass = authorization.split(' ')[1]
    var plaintext = Buffer.from(userpass, 'base64').toString('ascii')

    var username = plaintext.split(':')[0]
    var password = plaintext.split(':')[1]

    if(username == 'swagger-te' && password == 'telkom'){
       return true
    }
    else{
        return false
    }


}



app.post('/auth/login', function(req, res){
    if(auth(req.headers.authorization) === true){
        fs.readFile(pathfiledata, 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                var file = JSON.parse(data);
                var isFind = false;
                var x = null;
                for(i in file){
                    if(file[i].username == req.body.username && file[i].password == req.body.password) {
                        isFind = true
                        x = i
                        console.log(file[i].username+"--"+req.body.username+"--"+file[i].password+"--"+req.body.password)
                        break
                    }         
                }
                console.log("credential is "+isFind)
                
                if(isFind === true){
                    res.status(200).json(
                        respon(true, file[x], 200, "login success")
                    )
                }else{
                    res.status(200).json(
                        respon(false, null, 403, "ivalid username or password")
                    )
                }
    
                
            }
         
         });
        
    }
    else{
        res.status(200).json(
            respon(false, null, 401, "failed authorization")
        )
    }
})


module.exports = app;