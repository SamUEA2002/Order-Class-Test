//Server that the website runs on

const express = require('express');
const app = express();

const fs = require('fs');

app.use(express.static('public'));

const bodyParser = require('body-parser');
const { response } = require('express');
const jsonParser = bodyParser.urlencoded({ extended: false });
const jsonString = bodyParser.urlencoded({ extended: false });

//use app.post :)

app.post('/confirm', jsonParser, (req, res) => {

    //Processes the form data
    //Private data is held in a Hash incase the data is released 

    console.log(req.body);
    const lotType = req.body.Lots
    const spaceType = req.body.types
    const numberPlate = req.body.Reg
    const startDate = req.body.Date
    const startTime = req.body.Time
    const Duration = req.body.Duration


    //creates (semi)random order ID for file name
    //var orderID = Math.random() * (999 - 1) + 1;
    var orderID = 10;
    var fileName = orderID.toString();
    console.log(fileName)


    //format responce for json
    var response = {
        orderID: orderID,
        lotType: lotType,
        spaceType: spaceType,
        numberPlate: numberPlate,
        startDate: startDate,
        startTime: startTime,
        Duration: Duration,
    }

    //write responce to json

    fs.writeFile(fileName, JSON.stringify(response, null, 2), err => {
        if (err) return console.log(err);
        console.log('file saved!');
    });

    res.redirect('/confirm.html')

});

app.get('/getOrder', (req, res) => {

    fs.readFile("10", function(err, data) {
      
        // Check for errors
        if (err) throw err;
       
        // Converting to JSON
        var items = JSON.parse(data);

        var orderID = items.orderID;
        var lotType = items.lotType;
        var spaceType = items.spaceType;
        var numberPlate = items.numberPlate;
        var startDate = items.startDate;
        var startTime = items.startTime;
        var duration = items.Duration;
        
        //console.log(items.Duration);

        res.set('Content-Type', 'text/html')
        res.send(Buffer.from(
            '<!DOCTYPE html>'+
            '<html lang="en">'+
            '<link rel="stylesheet" href="style.css" />'+
            '<link rel="stylesheet" href="header.css" />'+

            '<head><title>ORDER INFO</title></head>'+

            '<body>'+
            '<div class="header">'+
                '<a class="logo">USER ORDER '+orderID+'</a>'+
                '<div class="header-right">'+
                  '<a class="active" href="/index.html">Home</a>'+
                '</div>'+
              '</div>'+
            '</body>'+

            '<p>User      : </p>'+
            '<p>Order ID  : '+orderID+'</p>'+
            '<p>Order Type: '+lotType+'</p>'+
            '<p>Space Type: '+spaceType+'</p>'+
            '<p>Reg       : '+numberPlate+'</p>'+
            '<p>Start Date: '+startDate+'</p>'+
            '<p>Start Time: '+startTime+'</p>'+
            '<p>Duration  : '+duration+'</p>'
            
            ))

    });

    



    




});


app.listen(3000, function () {
    console.log('Express app listening on port 3000...')
});