'use-strict';

const util = require('util');
const restify = require('restify-clients');
require('dotenv').config();

var client = restify.createJsonClient({
    url: 'http://localhost:'+process.env.PORT,
    version: '*',
});

var a = encodeURIComponent(`北京市海淀区中关村南一街7号平房-4号`);
var b = encodeURIComponent(`北京市`);
var c = encodeURIComponent(`海淀区`);
var d = encodeURIComponent(`北京市`);
var e = encodeURIComponent(`中关村南一街`);
var f = encodeURIComponent(`7号平房-4号`);

var CLIENT_KEY = process.env.CLIENT_KEY;

client.basicAuth('pdq_logistics', CLIENT_KEY);

client.post('/create-factory', {
    name: "SIP_Factory", open_time: "8am", close_time: "10pm", 
    fact_lat: "39.990912", fact_long: "116.327159", fact_type: "stationary", branch_name: "BejingPDQ", fact_status: "operational",
    fact_mat_address: "北京市海淀区中关村南一街7号平房-4号", citycode: "131", city: "北京市",
    district: "海淀区", province: "北京市", street: "中关村南一街", street_number: "7号平房-4号"
},
(err, req, res, obj) => {
    if (err) console.error(err);
    else console.log(obj);    //console.log('Created '+ util.inspect(obj));
});