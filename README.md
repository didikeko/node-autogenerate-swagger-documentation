BUild to Emages
 docker build -t didikpram/swagger-server:1.0 .

Create Container 
  docker container create --name swagger-server -p 8080:5000 -e PORT=5000 didikpram/swagger-server:1.0

Start Container
  cocker container start swagger-server
