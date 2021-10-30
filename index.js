const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require("body-parser");

const https = require('https')
const http = require('http');

const transitURL = "api.actransit.org" 
const transitToken = "55F1E71CC988E2A2C1B2C24DA579A7D6"
// https://api.actransit.org/transit/routes/?token=55F1E71CC988E2A2C1B2C24DA579A7D6

app.use(bodyParser.json({limit : "500mb"}));
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

app.get('/prediction/:id', (request, response) => {
    let id = request.params.id;
    response.setHeader('Content-Type', 'application/json');

    const transitReq = https.request("https://api.actransit.org/transit/stops/"+id+"/tripstoday/?token=55F1E71CC988E2A2C1B2C24DA579A7D6", res => {
        console.log(`statusCode: ${res.statusCode}`)
    
        var data = ''
      
        res.on('data', d => {
            data += d
        })
        
        res.on('end', function () {
            let js = JSON.parse(data);
            
            let parsed = []
            for(let arrival in js) {
                // let routeName = getRouteName(arrival["RouteId"]);
                // parsed.push({"PassingTime": arrival["PassingTime"], "RouteName": routeName});
            }

            process.stdout.write(data)
            response.send(data);
            response.end();
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

// let cachedRoutes = {};
// function getRouteName(routeId) {
//     return new Promise((resolve, reject) => {  
//         if(cachedRoutes[routeId]) {
//             resolve(cachedRoutes[routeId]);
//         }

//         const transitReq = https.request("https://api.actransit.org/transit/route/"+routeId+"/?token=55F1E71CC988E2A2C1B2C24DA579A7D6", res => {
//             console.log(`statusCode: ${res.statusCode}`)
            
//             var data = ''; 
//             await res.on('data', d => {
//                 data += d
//             })
            
//             res.on('end', function () {
//                 process.stdout.write(data)

//                 let js = JSON.parse(data);
//                 cachedRoutes[routeId] = js["Description"];
//             })
//         });
//     });
// }