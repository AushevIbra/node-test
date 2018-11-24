//var axios = require('axios');
//var fetch = require('node-fetch');
const unirest = require('unirest');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// fetch('https://exp.host/--/api/v2/push/send', {
//       body: JSON.stringify({
//         to: "ExponentPushToken[ZP9voPBOQAKm7t2F_rJFa-]",
//         title: "test",
//         sound: 'default',
//         body: "test",
//         data: { message: "test" },
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//     });



app.get('/api', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    var posts = [];
    unirest.get(req.query.url)
    .end(function(response){
        var $ = cheerio.load(response.body)
        var price = $(".n-snippet-cell2__main-price-wrapper");
        

        
        for(var i=0; i<$(".n-snippet-list .n-snippet-cell2__title").length; i++){
            var _price = price.find('.price')[i].childNodes[0].data
            var title = $(".n-snippet-list .n-snippet-cell2__title")[i].childNodes[0].attribs.title;
            posts.push({title, _price});
            
        }  
       
        res.send(JSON.stringify(posts));    
})
        
})

app.get('/', function(req,res){
    res.sendFile(__dirname + "/build/index.html");
})

app.listen(PORT, function(){
    console.log(path.join(__dirname, '../build', 'index.html'), PORT)
})