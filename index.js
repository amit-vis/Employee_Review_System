const express = require('express');
const app = express();
const port = 5000;
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport_local_stratergy');


app.use(express.urlencoded({extended: true}));

// use the static assets file here
app.use(express.static('./assets'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);

// extarct the style and script from the sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name: 'Employee Review System',
    secret: 'test',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000* 60* 100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use the express router
app.use('/', require('./routes'));

// start our app on port
app.listen(port, function(err){
    if(err){
        console.log("didn't find the port", err);
    }
    console.log("port is find on: ", port)
})