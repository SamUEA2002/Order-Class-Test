//Server that the website runs on

const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path')

app.use(express.static('public'));

const bodyParser = require('body-parser');
const { response } = require('express');
const jsonParser = bodyParser.urlencoded({ extended: false });

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
    //var orderID = Math.round(Math.random() * 1000);
    let d = new Date();
    var orderID = 'Order#' + Math.round(d.getTime());
    //var orderID = '#10';
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

    fs.writeFile('UnconfirmedOrders/' + fileName + '.json', JSON.stringify(response, null, 2), err => {
        if (err) return console.log(err);
        console.log('file saved!');
    });

    return res.redirect('/user.html')
});

app.get('/getOrder', (req, res) => {

    fs.readFile('UnconfirmedOrders/'+"#10"+'.json', function (err, data) {

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
            '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<link rel="stylesheet" href="style.css" />' +
            '<link rel="stylesheet" href="header.css" />' +

            '<head><title>ORDER INFO</title></head>' +

            '<body>' +
            '<div class="header">' +
            '<a class="logo">USER ORDER ' + orderID + '</a>' +
            '<div class="header-right">' +
            '<a class="active" href="/user.html">User Home</a>' +
            '</div>' +
            '</div>' +
            '</body>' +

            '<p>User      : </p>' +
            '<p>Order ID  : ' + orderID + '</p>' +
            '<p>Order Type: ' + lotType + '</p>' +
            '<p>Space Type: ' + spaceType + '</p>' +
            '<p>Reg       : ' + numberPlate + '</p>' +
            '<p>Start Date: ' + startDate + '</p>' +
            '<p>Start Time: ' + startTime + '</p>' +
            '<p>Duration  : ' + duration + '</p>' +

            '<br>'


        ))

    });

    return;
});




app.get('/getAllOrders', (req, res) => {

    const directoryPath = path.join(__dirname, '/UnconfirmedOrders');

    fs.readdir(directoryPath, function (err, files) {

        res.set('Content-Type', 'text/html')
        res.write(Buffer.from(

            
            '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<link rel="stylesheet" href="style.css" />' +
            '<link rel="stylesheet" href="header.css" />' +

            '<head><title>ORDER INFO</title></head>' +

            '<body>' +
            '<div class="header">' +
            '<a class="logo">All Unconfirmed Orders </a>' +
            '<div class="header-right">' +
            '<a class="active" href="/user.html">User Home</a>' +
            '</div>' +
            '</div>' +
            '</body>'+

            '<p>test3     : </p>',
            
            //listing all files using forEach
            files.forEach(function (file) {
    
                console.log(file);
                var name = file;
    
                fs.readFile(__dirname + '/UnconfirmedOrders/' + name, function (err, data) {
                
    
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
    
                    console.log("FILE: "+ file)
                    console.log(items)+

                
                    res.write(Buffer.from(
                    
                        '<p>User      : </p>' +
                        '<p>Order ID  : ' + orderID + '</p>' +
                        '<p>Order Type: ' + lotType + '</p>' +
                        '<p>Space Type: ' + spaceType + '</p>' +
                        '<p>Reg       : ' + numberPlate + '</p>' +
                        '<p>Start Date: ' + startDate + '</p>' +
                        '<p>Start Time: ' + startTime + '</p>' +
                        '<p>Duration  : ' + duration + '</p>' +
    
                        '<br>'
                    
                    ))

                });

            })

        ))
    });
    return;
});


app.listen(3000, function () {
    console.log('Express app listening on port 3000...')
});