import util from 'util';
import request from 'superagent';
import DBG from 'debug';

const log = DBG('factory-server-location-client:service');

import * as factoryModel from '../controller/factory-mongo.mjs';
import * as orderModel from '../controller/order-mongo.mjs';
import centreGeolocator from '../factorypositioning.mjs';



const baiduMapsServerApiKey = '9qsKogo52nASurN27GCIRDotGCPHGeEl';
const baiduMapsClientApiKey = 'hGlgvjOZ8qmDBC0dKGNbqcgnIvIM6h6D';


/*  
*   Geocoding 
*   Takes the formatted address in Chinese and returns the coordinates
*   (latitude & longitude) of the location.
*   E.g. 北京市海淀区中关村南一街7号平房-4号
*/

export async function geoCodeAsync(addr) {
    try{
        const queryaddress = encodeURIComponent(addr);
        var res = await request.get(`https://api.map.baidu.com/geocoding/v3/?address=${queryaddress}&output=json&ak=${baiduMapsServerApiKey}`)
        .accept('application/json');
    var js = JSON.parse(res.text);
    var sd = JSON.parse(res.text);
    var sj = JSON.stringify(js, null, 4);
    var kl = sd.result;
    return [kl.location.lat, kl.location.lng];
    } catch(e){
        console.log(e);
    }  
}


/* 
*   Reverse Geocoding
*   Takes the location coordinates (latitude & longitude)
*   of a location and returns the Chinese address.
*   E.g. lng: 116.327159, lat: 39.990912
*/

export async function reverseGeoCodeAsync(lat,long) {
    try{
        const querypoints = encodeURIComponent(`${lat},${long}`);
        var res = await request.get(`https://api.map.baidu.com/geocoder?location=${querypoints}&output=json&ak=${baiduMapsServerApiKey}`)
        .accept('application/json');
        return res.text;
    } catch(e){
        console.log(e);
    }
}

// /*
// *   Batch Calculation Service 
// *   Takes an order location coordinates and also the factory location(s) coordinates
// *   //then calculates the duration and distance of the various routes to the factories
// *   //then returns the quickest route hence the closest factory.
// *   returns the list of routes with their respective distance and duration. 
// */

export async function batchCalService(origin) {
    // Gets the coordinates of the customer's address
    const [lat , lng] = await geoCodeAsync(origin);
    var orderobj = await orderModel.add(origin, lat, lng);
    console.log(orderobj);
    const orig = `${lat},${lng}`;
    const [dest , factCoorlist] = await factoryModel.findAllMatted();
    
    try{
        var res = await request.get(`https://api.map.baidu.com/routematrix/v2/driving?output=json&origins=${orig}&destinations=${dest}&ak=${baiduMapsServerApiKey}`)
        .accept('application/json');
    var parsert = JSON.parse(res.text);
    var raesert = JSON.parse(res.text);;
    const td =parsert.result;
    const dt = raesert.result;

    // Returns the array of objects sorted by their duration values
    var  v = td.sort((x, y) =>{
        return x.duration.value - y.duration.value
    });

    // v[0] is the object of the array with the quickest route
    const gv = v[0].duration.value;

    // This is used to check the index of the quickest route
    // in the original unsorted list 
    // so the lat & long coordinates can be returned to be queried
    // against the factory database
    var dm;
    var durmat = dt.forEach(function(x, index){
        if (x.duration.value == gv){
            dm = index
        }
    });
    var factcordinates =  factCoorlist[dm].split(',');
    console.log(`Fact Coordintes ${factcordinates}`);
    const closestfactory = await factoryModel.closestFactory(factcordinates[0],factcordinates[1]);
    console.log(dm);
    console.log(gv);
    console.log(td);
    console.log(dt);
    return closestfactory;
    } catch(e){
        console.log(e);
    }
}

/*  
*   New Factory location service
*   Analyzes customer order locations and tries to determine the 
*   best location to construct a new factory
*/

export async function newFactoryLocation() {
    var orderCoordinates = await orderModel.findAllOrderCoordinates();
    console.log(orderCoordinates);
    var recoPoints = await centreGeolocator(orderCoordinates);
    console.log(recoPoints);
    var addressfrompoints = await reverseGeoCodeAsync(recoPoints.latitude, recoPoints.longitude);
    console.log(addressfrompoints);
    var resParsed = JSON.parse(addressfrompoints);
    console.log(recoPoints.latitude);
    if (isNaN(recoPoints.latitude)){
        return `No order data available to make suuggestion`;
    }
    else{
        return resParsed.result;
    }
    
}