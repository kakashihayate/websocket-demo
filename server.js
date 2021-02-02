// Node.js WebSocket server script
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
var app = express();
const server = http.createServer(app);
const WebSocketServer = require('websocket').server;
const fs = require('fs');
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");
const {

    allowInsecurePrototypeAccess
  
  } = require("@handlebars/allow-prototype-access");

var port = process.env.PORT || 9898;

const path = require('path');

server.listen(port, () => {
    console.log("Express server started at port:",+ port);
});

const wsServer = new WebSocketServer({
    httpServer: server
});
var webclient= null;
var client = null;

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    if(request.httpRequest.url != "/"){
        console.log("mobile");
        client = connection
    }else{
        webclient = connection
    }

    connection.on('message', function(message) {
    //   console.log('Received Message:', message.utf8Data);
    //   connection.sendUTF('Ok');
    if(webclient == connection){
        console.log("Web Client");
        if(client){
            client.sendUTF(message.utf8Data);
        }else{
            webclient.sendUTF(JSON.stringify({amount:'',type:'',server:'Ok'}));
        }              
    }else{
        if(webclient){
            webclient.sendUTF(message.utf8Data);
        }else{
            client.sendUTF("No Client Connected");
        }
        
    } 
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(

    "hbs",
  
    exphbs({
  
      handlebars: allowInsecurePrototypeAccess(handleBars),
  
      extname: "hbs",
  
      defaultLayout: "mainLayout.hbs",
  
      layoutsDir: __dirname + "/views/layouts/"
  
    })
  
  );

app.set("view engine", "hbs");
app.use("/",express.static(__dirname + "/views"));


app.get("/", (req, res) => {
    res.render("index",{layout: false});
});

app.get("/admin", (req, res) => {
    res.render("adminDashboard",{layout: false});
});

app.post('/setAmount', function (req, res) {   
    console.log("--------------"); 
    console.log(req.body);    
    webclient.sendUTF(JSON.stringify(req.body))
    res.send(JSON.stringify(req.body))
 })