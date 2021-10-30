const express = require('express')
const app = express()
const port = process.env.PORT || 8080

const https = require('https')
const http = require('http');

const transitURL = "api.actransit.org" 
const transitToken = "55F1E71CC988E2A2C1B2C24DA579A7D6"
// https://api.actransit.org/transit/routes/?token=55F1E71CC988E2A2C1B2C24DA579A7D6


app.get('/', (request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const transitReq = https.request("https://api.actransit.org/transit/stops/?token=55F1E71CC988E2A2C1B2C24DA579A7D6", res => {
        console.log(`statusCode: ${res.statusCode}`)
    
        var data = ''
      
        res.on('data', d => {
            data += d
        })
        
        res.on('end', function () {
            // console.log("Read data:")
            // console.log(data)
            // console.log("------")
            process.stdout.write(data)
            // console.log("======")
            response.send(data);
            // console.log(">>>>>>>>")
            response.end();
            // console.log("Finished");
        })
    })

    transitReq.on('error', error => {
        console.error(error)
        response.send('ERROR: ' + error)
        response.end();
    })

    transitReq.end()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})