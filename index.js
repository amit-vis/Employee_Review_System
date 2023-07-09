const express = require('express');
const app = express();
const port = 5000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.use(express.urlencoded());

// use the static assets file here
app.use(express.static('./assets'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// app.use(expressLayouts);

// extarct the style and script from the sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// use the express router
app.use('/', require('./routes'));

// start our app on port
app.listen(port, function(err){
    if(err){
        console.log("didn't find the port", err);
    }
    console.log("port is find on: ", port)
})