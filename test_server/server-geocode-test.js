'use-strict';

const util = require('util');
const restify = require('restify-clients');
const path = require('path');
const fs = require('fs-extra');
require('dotenv').config();

var client = restify.createJSONClient({
    url: 'http://localhost:'+process.env.PORT,
    version: '*',
});

var CLIENT_KEY = process.env.CLIENT_KEY;

client.basicAuth('pdq_logistics', CLIENT_KEY);

// client.post('/customercoordinates', { 
//     addr: "江苏省苏州市虎丘区高新区科憬路110号"
// },
// (err, req, res, obj) =>{
//     if (err) console.error(err);
//     else console.log(obj); //console.log(util.inspect(obj));
// });

// client.post('/customeraddress', {
//     lat: '31.33411080817319', long: '120.42021604638555'
// },
// (err, req, res, obj) =>{
//     if (err) console.error(err);
//     else console.log(obj);
// });

client.post('/nearestfactory', {
    orig: `江苏省苏州市虎丘区松花江路368号`
},
(err, req, res, obj) =>{
    if (err) console.error(err);
    else console.log(`bactchCalService nearest factory ${obj}`);
});

async function chineseAddressDir() {
    const dir = "newfactorysuggestions";
    await fs.ensureDir(dir);
    return dir;
}

function filePath(addressdir, key) {
    return path.join(addressdir, `${key}.txt`);
}

async function address_write(obj) {
    var addressdir = await chineseAddressDir();
    var filenam = 'newfactorysugg'+Date.now();
    const writeTo = filePath(addressdir, filenam);
    await fs.writeFile(writeTo, obj, 'utf8');
    console.log('Written to file successfully');
}

// client.get('/newfactorylocationsuggestion',
// (err, req, res, obj) => {
//     if (err) console.error(err.stack);
//     else console.log('Server Response: '+ util.inspect(obj));
//     const addrjson = util.inspect(obj);
//     address_write(addrjson);
// });



