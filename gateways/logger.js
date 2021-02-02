var http = require('http');
var { appName } = require('../shared/appsettings');

exports.Debug = (messageShort, messageVerbose) => {
    var options = {
        host: '192.168.0.110',
        path: '/debug',
        //since we are listening on a custom port, we need to specify it by hand
        port: '3055',
        //This is what changes the request to a POST request
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      };
      
      callback = function(response) {
        var str = ''
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        response.on('end', function () {
          console.log(str);
        });
      }
      
      var req = http.request(options, callback);
      //This is the data we are posting, it needs to be a string or a buffer
      var reqBody = {
          application: appName,
          shortMessage: messageShort,
          verboseMessage: messageVerbose
      }

      req.write(JSON.stringify(reqBody));
      req.end();
}

exports.Warning = (messageShort, messageVerbose) => {

}

exports.Error = (messageShort, messageVerbose) => {
    var options = {
        host: '192.168.0.110',
        path: '/error',
        //since we are listening on a custom port, we need to specify it by hand
        port: '3055',
        //This is what changes the request to a POST request
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      };
      
      callback = function(response) {
        var str = ''
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        response.on('end', function () {
          console.log(str);
        });
      }
      
      var req = http.request(options, callback);
      //This is the data we are posting, it needs to be a string or a buffer
      var reqBody = {
          application: appName,
          shortMessage: messageShort,
          verboseMessage: messageVerbose
      }

      req.write(JSON.stringify(reqBody));
      req.end();
}