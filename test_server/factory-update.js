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

client.post('/update-factory'+ process.argv[2], {
    name: "SIP_Factory", new_name: "Shanghai_Factory", open_time: "8am", close_time: "10pm", 
    fact_lat: "39.990912", fact_long: "116.327159", fact_type: "stationary", branch_name: "BejingPDQ", fact_status: "operational",
    fact_mat_address: "北京市海淀区中关村南一街7号平房-4号", citycode: "131", city: "北京市",
    district: "海淀区", province: "北京市", street: "中关村南一街", street_number: "7号平房-4号"
},
(err, req, res, obj) => {
    if (err) console.error(err);
    else console.log('Updated '+ util.inspect(obj));
});