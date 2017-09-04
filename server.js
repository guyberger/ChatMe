var http = require('http');
var fs = require('fs');
var urlUtil = require('url');
var queryUtil = require("querystring");
var msgs = [];
// Create a server
http.createServer( function (request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*'); 
   // Parse the request containing file name
   var pathname = urlUtil.parse(request.url).pathname;
   var data;
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
      if (request.method === 'POST') {
        // response.end(JSON.stringify("hey there"));   
        console.log("start Post New Message");
        var requestBody = '';
        request.on('data', function(chunk) {
            requestBody += chunk.toString();
        });
         request.on('end', function() {
           if(pathname == "/messages"){
            var url = urlUtil.parse(request.url,true);
            data = queryUtil.parse(requestBody);
            console.log(data);
            msgs.push(data);
            response.end(JSON.stringify(msgs));
            console.log("good response");
          }
         });
          
      }
      // Send the response body 
      response.end();   
}).listen(8080);

// Console will print the message
console.log('Server listenning on port 8081');