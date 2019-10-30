//'use strict';

// const util = require('util');
// const restify = require('restify-clients');

import fs from 'fs-extra';
import restify from 'restify-clients';
import util from 'util'; 
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

var client = restify.createJSONClient({
    url: 'https://api.map.baidu.com',
    version: '*'
});

async function chineseAddressDir() {
    const dir = "chineseAddress";
    await fs.ensureDir(dir);
    return dir;
}

function filePath(addressdir, key) {
    return path.join(addressdir, `${key}.txt`);
}

const baiduMapsApiKey = process.env.BAIDU_MAPS_SERVER_API_KEY; //serverAPIKey



// var valURL = encodeURIComponent(`10 Shangdi 10th Street, Haidian District, Beijing &output=json&ak=${baiduMapsApiKey}&callback=showLocation`); //&callback=showLocation)
// var valURL = encodeURIComponent(`北京市海淀区上地十街10号`);

var valURL = encodeURIComponent(`江苏省苏州市虎丘区昆仑山路2号`);


// Geocoding
//Takes the address in Chinese and returns the coordinates (latitude & longitude) of the location

//client.get(`/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=${baiduMapsApiKey}&callback=showLocation`,
client.get(`/geocoding/v3/?address=${valURL}&output=json&ak=${baiduMapsApiKey}`,
(err, req, res, obj) => {
    if (err) console.error(err.stack);
    else console.log('Baidu real chinese address response '+ util.inspect(obj));
});

// IP location resolver
// Takes the ip address and tries to return the most accurate location
/* client.get(`/location/ip?ip=58.211.36.40&ak=${baiduMapsApiKey}`,
(err, req, res, obj) => {
    if (err) console.error(err.stack);
    else console.log('Baidu ip locator response '+ util.inspect(obj));
}); */

// Coordinate transformation 
// Experiment
/* client.get(`/geoconv/v1/?coords=114.21892734521,29.575429778924&from=1&to=5&ak=${baiduMapsApiKey}`,
(err, req, res, obj) => {
    if(err) console.error(err.stack);
    else console.log('Baidu coordinate transformation response '+ util.inspect(obj));
}); */

/* var factCoors = [`40.05703033345938,116.3084202915042`,`31.328219497078656,120.42596652305681`,`31.32769841204243,120.43867254156301`,
        `31.321412901107692,120.49390458635236`,`31.399277129391496,120.47843176262117`,`31.392437469952508,120.51279563232872`,
        `31.32643166563347,120.40898960802043`,`31.371914825252034,120.41613311848671`,`31.29507858694496,120.42260012495478`,`31.32132398089567,120.50667714324597`,
        `31.358163462467783,120.49687932504862`,`31.35093828043892,120.49063250853226`];

// Encoding the latitude and longitude
var locoor = encodeURIComponent(`31.35093828043892,120.49063250853226`)

async function address_write(obj) {
    var addressdir = await chineseAddressDir();
    var filenam = 'chinaddr'+Date.now();
    const writeTo = filePath(addressdir, filenam);
    await fs.writeFile(writeTo, obj, 'utf8');
    console.log('Written to file successfully');
}

// Reverse Geocoding - takes the longitude and latitude and returns an address
client.get(`/geocoder?location=${locoor}&output=json&ak=${baiduMapsApiKey}`,
(err, req, res, obj) => {
    if (err) console.error(err.stack);
    else console.log('Reverse Geocoding' + util.inspect(obj));
    const addrjson = util.inspect(obj);
    address_write(addrjson);
}); */

/* const batch_cal = 'Http://api.map.baidu.com/routematrix/v2/driving?output=json&origins=40.45,116.34|40.54,116.35&destinations=40.34,116.45|40.35,116.46&ak=your AK'

client.get(`/routematrix/v2/driving?output=json&origins=40.45,116.34&destinations=40.34,116.45|40.35,116.46|40.54,116.35&ak=${baiduMapsApiKey}`,
(err, req, res, obj) => {
    if (err) console.error(err.stack);
    else {
        console.log(util.inspect(obj));
        util.inspect(obj.result.forEach(element => {
        console.log('Distance ' + util.inspect(element.distance));
        console.log('Duration ' + util.inspect(element.duration));
    }));
    }
}); */

// Web Services used from baidu maps
// *Batch Calculation Service
// *Forward/Reverse Geocoding Service





