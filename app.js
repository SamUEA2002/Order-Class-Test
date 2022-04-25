//Server that the website runs on

const express = require('express');
const app = express();

app.use(express.static('public'));

const bodyParser = require('body-parser');
const { res } = require('express');
const jsonParser = bodyParser.urlencoded({ extended: false });

//use app.post :)

app.post('/done', jsonParser, (req, res) => {

    //Processes the form data
    //Private data is held in a Hash incase the data is released 
    /*
    console.log(req.body);
    const FirstName = req.body.name;
    const LastName = req.body.last_name;
    const UserEmail = req.body.email;
    const UserNumber = req.body.number;

*/
    res.redirect('/confirm.html')

});


app.listen(3000, function() {
    console.log('Express app listening on port 3000...')
});