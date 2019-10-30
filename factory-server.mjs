import restify from 'restify';
import util from 'util';

import DBG from 'debug';
import dotenv from 'dotenv';
const log = DBG('factory:service');
dotenv.config();

import * as factoryModel from './controller/factory-mongo.mjs';
import * as mapsModel from './mapsmodel/factory-server-location-client.mjs';

var server = restify.createServer({
    name: "Factory-Locator-Service",
    version: "1.0.0"
});

server.use(restify.plugins.authorizationParser());
server.use(check);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true
}));


// Create a factory record
server.post('/create-factory', async (req, res, next) => {
    try {
        var result = await factoryModel.create(
            req.params.name, req.params.open_time, req.params.close_time, req.params.fact_lat,
            req.params.fact_long, req.params.fact_type, req.params.branch_name, req.params.fact_status, req.params.fact_mat_address, req.params.citycode, req.params.city, 
            req.params.district, req.params.province, req.params.street, req.params.street_number,
        )
        res.send(result);
        next(false);
    } catch(err) {
        res.send(500, err); next(false);
        console.log(err);
    }
});

// Update an existing factory
server.post('/update-factory:factoryname', async (req, res, next) => {
    log(`update ${util.inspect(req.params)}`);
    try{
        var result = await factoryModel.update(
            req.params.name, req.params.new_name, req.params.open_time, req.params.close_time, req.params.fact_lat,
            req.params.fact_long, req.params.fact_type, req.params.branch_name, req.params.fact_status, req.params.fact_mat_address, req.params.citycode, req.params.city, 
            req.params.district, req.params.province, req.params.street, req.params.street_number, 
        );
        res.send(result);
        next(false);
    } catch(err) {
        res.send(500, err); next(false);
        console.log(err);
    }
})

// Find the factory data 
server.get('/find:factoryname', async (req, res, next) => {
    try {
        var facto = await factoryModel.read(req.params.factoryname);
        if(!facto) {
            //res.send(404, new Error(`Did not find ${req.params.factoryname}`));
            res.send(`Did not find ${req.params.factoryname}`);
        } else {
            //console.log(facto);
            res.send(facto);
        }
        next(false);
    } catch(err) {
        console.log(err);
        console.log("\nUnable to find queried factory, It doesn't exist");
        res.send(`\nDid not find ${req.params.factoryname}`);
        //res.send(500, err); next(false);
    }
});

// Delete a factory record
server.del('/destroy:factoryname', async (req, res, next) => {
    try {
        await factoryModel.destroy(req.params.factoryname);
        res.send(`${req.params.factoryname}`);
        next(false);
    } catch(err) {
        res.send(500, err); 
        next(false);
    }
});

// List factories
server.get('/list', async (req, res, next) => {
    try {console.log('factory_list');
        console.log();
        var factorylist = await factoryModel.findAll(); //findAllMatted();
        if (!factorylist) factorylist = [];
        res.send(factorylist);
        next(false);
    } catch(err) {
        res.send(500, err); 
        next(false);
    }
});

// Returns coordinates of customer's address
server.post('/customercoordinates', async(req, res, next) => {
    try {
        log('Returns customer\'s coordinate points');
        console.log(req.params.addr);
        var mapobj = await mapsModel.geoCodeAsync(req.params.addr);
        if (!mapobj) mapobj = [];
        res.send(mapobj);
        // var mapCoor = JSON.parse(mapobj);
        // var mapLL = JSON.stringify(mapCoor, null, 4);
        // console.log(mapLL);
        console.log(mapobj);
        next(false);
    } catch(err) {
        res.send(500, err);
        next(false);
    }
});

// Returns formatted customers address
server.post('/customeraddress', async(req, res, next) => {
    try {
        log('Returns customer\'s fomratted address given the location coordinates');
        var mapAddr = await mapsModel.reverseGeoCodeAsync(req.params.lat, req.params.long);
        if (!mapAddr) mapAddr = [];
        res.send(mapAddr);
        var mapAd = JSON.parse(mapAddr);
        var mapAr = JSON.stringify(mapAd, null, 4);
        console.log(mapAr);
        next(false);
    } catch(err){
        //console.log(err)
        res.send(500, err);
        next(false);
    }
});

server.post('/nearestfactory', async(req, res, next) => {
    try {
        var routes = await mapsModel.batchCalService(req.params.orig);
        if (!routes) routes = [];
        res.send(routes);
    } catch(err){
        console.log(err);
        //res.send(500, err);
        next(false);
    }
})


server.get('/newfactorylocationsuggestion', async(req, res, next) => {
    try{
        var suggestion = await mapsModel.newFactoryLocation();
        if (!suggestion) suggestion = []
        res.send(suggestion);
    } catch(err){
        console.log(err);
    }
})




server.listen(process.env.PORT, "localhost", function(){
    log(server.name +' listening at '+ server.url);
})

// Factory Locator Subsystem API Key

var clientkey = process.env.CLIENT_KEY;

var apiKeys = [{
    user: 'pdq_logistics',
    key: clientkey
}];


function check(req, res, next) {
    if (req.authorization) {
        var found = false;
        for (let auth of apiKeys) {
            if (auth.key ===req.authorization.basic.password
                && auth.user === req.authorization.basic.username) {
                    found = true;
                    break;
                }
        }
        if (found) next();
        else {
            res.send(401, new Error("Not authentication"));
            next(false);
        }
    } else {
        res.send(500, new Error('No Authorization Key'));
        next(false);
    }
}