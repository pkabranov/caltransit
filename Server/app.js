const https = require('https')
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const transitURL = "api.actransit.org" 
const transitToken = "55F1E71CC988E2A2C1B2C24DA579A7D6"
// https://api.actransit.org/transit/routes/?token=55F1E71CC988E2A2C1B2C24DA579A7D6

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  
  // const options = {
  //   hostname: transitURL,
  //   port: 443,
  //   path: '/transit/routes',
  //   method: 'GET'
  // }
  res.setHeader('Content-Type', 'text/plain');
  
  const transitReq = https.request("https://api.actransit.org/transit/routes/?token=55F1E71CC988E2A2C1B2C24DA579A7D6", res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      process.stdout.write(d)
      res.write(d);
      res.end();
    })
  })
  
  transitReq.on('error', error => {
    console.error(error)
    res.write('ERROR: ' + error)
    res.end();
  })
  
  transitReq.end()
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
