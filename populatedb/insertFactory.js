'use-strict';

const util = require('util');
const restify = require('restify-clients');

var client = restify.createJsonClient({
    url: 'http://localhost:'+process.env.PORT
});

require('dotenv').config();

var CLIENT_KEY = process.env.CLIENT_KEY;

client.basicAuth('pdq_logistics', CLIENT_KEY);

var date = new Date();

client.post('/create-factory', {
    name: "Geddies Factory", open_time: `${date.setHours(8,00)}`, close_time: `${date.setHours(22,00)}`,
    fact_lat: "31.328219", fact_long: "120.425967", fact_type: "stationary", branch_name: "Suzhou Outlet I", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市虎丘区青山路5号", citycode: "224", city: "苏州市", 
    district: "虎丘区", province: "江苏省", street: "青山路", street_number: "5号", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "Factory 360 Degrees", open_time: `${date.setHours(7,00)}`, close_time: `${date.setHours(23,00)}`,
    fact_lat: "31.327698", fact_long: "120.438673", fact_type: "stationary", branch_name: "Suzhou Outlet II", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市虎丘区科灵路", citycode: "224", city: "苏州市", 
    district: "虎丘区", province: "江苏省", street: "科灵路", street_number: "9", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "Gaosu", open_time: `${date.setHours(9,30)}`, close_time: `${date.setHours(00,00)}`,
    fact_lat: "31.321413", fact_long: "120.493905", fact_type: "stationary", branch_name: "Suzhou Outlet III", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市虎丘区y305", citycode: "224", city: "苏州市", 
    district: "虎丘区", province: "江苏省", street: "马涧路", street_number: "2000", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "Tielu", open_time: `${date.setHours(11,30)}`, close_time: `${date.setHours(1,00)}`,
    fact_lat: "31.399277", fact_long: "120.478432", fact_type: "stationary", branch_name: "Suzhou Outlet IV", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市虎丘区新振路518号", citycode: "224", city: "苏州市", 
    district: "虎丘区", province: "江苏省", street: "新振路", street_number: "518号", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "Yidali La Xiangchang Factory", open_time: `${date.setHours(7,00)}`, close_time: `${date.setHours(21,30)}`,
    fact_lat: "31.392437", fact_long: "120.512796", fact_type: "stationary", branch_name: "Suzhou Outlet V", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市虎丘区浒关北路251号", citycode: "224", city: "苏州市", 
    district: "虎丘区", province: "江苏省", street: "浒关北路", street_number: "251号", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "Max Factory", open_time: `${date.setHours(00,00)}`, close_time: `${date.setHours(8,00)}`,
    fact_lat: "31.326432", fact_long: "120.40899", fact_type: "stationary", branch_name: "Suzhou Outlet VI", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市吴中区光福镇枫浜村田里珠路19号", citycode: "224", city: "苏州市", 
    district: "吴中区", province: "江苏省", street: "光福镇枫浜村田里珠路", street_number: "19号", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "Gaochao Factory", open_time: `${date.setHours(14,00)}`, close_time: `${date.setHours(23,00)}`,
    fact_lat: "31.371915", fact_long: "120.416133", fact_type: "stationary", branch_name: "Suzhou Outlet VII", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市虎丘区昆仑山路166", citycode: "224", city: "苏州市", 
    district: "虎丘区", province: "江苏省", street: "昆仑山路", street_number: "166号", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "On Time Factory", open_time: `${date.setHours(17,00)}`, close_time: `${date.setHours(21,00)}`,
    fact_lat: "31.295078", fact_long: "120.4226", fact_type: "stationary", branch_name: "Suzzhou Outlet VIII", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市吴中区福利苏福路光福镇工业园东区66号", citycode: "224", city: "苏州市", 
    district: "吴中区", province: "江苏省", street: "福利苏福路", street_number: "66号", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "Greg Chin Factory", open_time: `${date.setHours(6,00)}`, close_time: `${date.setHours(18,00)}`,
    fact_lat: "31.321324", fact_long: "120.506677", fact_type: "stationary", branch_name: "Suzhou Outlet IV", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市虎丘区马涧路839-11", citycode: "224", city: "苏州市", 
    district: "虎丘区", province: "江苏省", street: "马涧路", street_number: "839号-11号", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "Meiwei Factory", open_time: `${date.setHours(11,00)}`, close_time: `${date.setHours(5,00)}`,
    fact_lat: "31.358163", fact_long: "120.496879", fact_type: "stationary", branch_name: "Suzhou Outlet V", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市虎丘区金燕路8", citycode: "224", city: "苏州市", 
    district: "虎丘区", province: "江苏省", street: "金燕路", street_number: "8号", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});

client.post('/create-factory', {
    name: "Scrumptious Toppings Factory", open_time: `${date.setHours(9,30)}`, close_time: `${date.setHours(14,30)}`,
    fact_lat: "31.350938", fact_long: "120.490633", fact_type: "stationary", branch_name: "Suzhou Outlet VI", 
    fact_status: "operational", fact_mat_address: "江苏省苏州市虎丘区鸿禧路155号", citycode: "224", city: "苏州市", 
    district: "虎丘区", province: "江苏省", street: "鸿禧路", street_number: "155号", 
},
(err, req, res, obj) => {
    if(err) console.error(err);
    else console.log(obj);
});