var express = require('express');
var bodyParser = require('body-parser');


var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var publication_routes = require('./routes/publication');
var publication_photo_routes = require('./routes/publication_photo');
var publication_evaluation_routes = require('./routes/publication_evaluation');
var save_publication_routes = require('./routes/save_publication');
var notification_routes = require('./routes/notification');

//middlewares

app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

//acceso cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); 

app.get('/', (req, res) => {
    res.send("Working!");
})

//rutas
app.use('/api', user_routes);
app.use('/api', publication_routes);
app.use('/api', publication_photo_routes);
app.use('/api', publication_evaluation_routes);
app.use('/api', save_publication_routes);
app.use('/api', notification_routes);

//exportar 
module.exports = app;