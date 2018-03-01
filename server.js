/**
 * Main server.js file.
 */
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var iso = require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;
var CLIENT_ID = '667ahbdmuijx0a6';
var DOMAIN = process.env.DOMAIN || 'http://localhost:8080';
var PORT = process.env.PORT || 8080;

/**
 * App configuration
 */

// Set the public files location
app.use(express.static(__dirname + '/public'));

// Log every request to the console
app.use(morgan('dev'));

// Parse application config
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride());
app.use(cors());

/**
 * App routes
 */

// Main route that serves index.html
app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

// Start application on port 8080
app.listen(PORT);
console.log('App listening on port 8080');

/**
 * Routes
 */

// Return dropbox account
app.get('/api/dropbox/getAccount', function(req, res) {
    var token = req.query.token;
    var dbx = getDropboxToken(token);

    dbx.usersGetCurrentAccount()
        .then(function(response) {
            res.json(response);
        })
        .catch(function(error) {
            console.error(error);
        });
});

app.get('/api/dropbox/getFilesAndFolders', function(req, res) {
    var token = req.query.token;
    var dbx = getDropboxToken(token);

    dbx.filesListFolder({
            path: ''
        })
        .then(function(response) {
            res.json(response.entries);
        })
        .catch(function(error) {
            console.error(error);
        });
});

app.get('/api/dropbox/auth', function(req, res) {
    var dbx = getDropboxAuth();

    var authUrl = dbx.getAuthenticationUrl(DOMAIN)
    res.send(authUrl);
});

// Create an instance of Dropbox with the provided clientId
function getDropboxAuth() {
    var dbx = new Dropbox({
        clientId: CLIENT_ID
    });

    return dbx;
}

// Create an instance of Dropbox with the provided access_token
function getDropboxToken(token) {
    var dbx = new Dropbox({
        accessToken: token
    });

    return dbx;
}
