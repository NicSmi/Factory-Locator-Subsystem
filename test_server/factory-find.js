'use strict';

const util = require('util');
const restify = require('restify-clients');

 var client = restify.createJSONClient({
     url: 'http://localhost:'+process.env.PORT,
     version: '*'
 });

require('dotenv').config();

var CLIENT_KEY = process.env.CLIENT_KEY;

client.basicAuth('pdq_logistics', CLIENT_KEY);


 client.get('/find'+ process.argv[2], 
 (err, req, res, obj) => {
     if (err) console.error(err.stack);
     else console.log('Server Response: '+ obj);//util.inspect(obj));
 });