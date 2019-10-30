'use-strict';

const util = require('util');
const restify = require('restify-clients');

require('dotenv').config();

var client = restify.createJsonClient({
    url: 'http://localhost:'+process.env.PORT,
    version: '*',
});

var CLIENT_KEY = process.env.CLIENT_KEY;

client.basicAuth('pdq_logistics', CLIENT_KEY);




client.get('/list',
(err, req, res, obj) => {
    if (err) console.error(err.stack);
    else console.log('Found '+ util.inspect(obj));
});