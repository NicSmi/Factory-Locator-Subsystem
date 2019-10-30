import util from 'util';
import Factory from '../model/factory.mjs';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
import DBG from 'debug';
const debug = DBG('factory:factory-mongodb');
const error = DBG('factory:error-mongodb');

var client;

async function connectDB() {
    if (!client) client = await MongoClient.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true});
    return {
        db: client.db(process.env.MONGO_DBNAME),
        client: client
    };
}

/*
This function is used to create a factory
*/
export async function create(name, open_time, close_time, latitude, longitude,
    type, branch_name, status, fact_mat_address, citycode , city, district, province, 
    street, street_number) {
        const { db, client } = await connectDB();
        // Creates new factory class
        const ory = new Factory(name, open_time, close_time, latitude, longitude,
            type, branch_name, status, fact_mat_address, citycode , city, district, province, 
            street, street_number);
        console.log(ory.name);
        // Converts factory object to JSON
        const factJSON = ory.JSON;
        console.log(factJSON);
        // Converts JSON to an object so it can inserted to MONGO 
        const factParsed = JSON.parse(factJSON); 
        const collection = db.collection('factory');
        await collection.insertOne(factParsed);
        //await collection.insertOne(ory);
        // await collection.insertOne({ name:name, open_time:open_time, close_time:close_time, 
        // latitude:latitude, longitude:longitude, type:type, status:status, location_name:location_name, address:address });
        //return factory;
        //return ory.name;
        return factJSON;
    }

export async function update(name, new_name, open_time, close_time, latitude, longitude,
    type, branch_name, status, fact_mat_address, citycode , city, district, province, 
    street, street_number) {
        const { db, client } = await connectDB();
        const ory = new Factory(new_name, open_time, close_time, latitude, longitude,
            type, branch_name, status, fact_mat_address, citycode , city, district, province, 
            street, street_number);
        const factJSON = ory.JSON;
        const factParsed = JSON.parse(factJSON);
        const collection = db.collection('factory');
        await collection.updateOne({ name: name }, { $set: factParsed })
        // await collection.updateOne({ name: name}, { $set: { name:new_name, open_time, close_time, 
        // latitude, longitude, type, status, location_name, address }});
        // return ory.name;
        return name;
    }

export async function destroy(name) {
    const { db, client } = await connectDB();
    const collection = db.collection('factory');
    await collection.findOneAndDelete({ name:name });
    return `Deleted ${name}`;
}

/*
*   Returns all the factories in the Database 
*/

export async function findAll() {
    const { db, client } = await connectDB();
    const collection = db.collection('factory');
    // const factory_list_cursor = await collection.find();
    // factory_list_cursor.each((err, item) => {
    //     console.log(item);
    // })
    //console.log(factory_list);
    //return factory_list;
    const factoryz = await new Promise((resolve, reject) => {
        var factoryzz = [];
        collection.find({}).forEach(
            facto => { factoryzz.push(facto); },
            err => {
                if (err) reject(err);
                else resolve(factoryzz);
            }
        );
    });
    console.log(factoryz);
    return factoryz;
}

/*
*   Querys MongoDB and finds the location coordinates of all the factories
*   then returns these coordinates formatted to be injected in the 
*   baidu maps URL
*
*/

export async function findAllMatted() {
    const { db, client } = await connectDB();
    const collection = db.collection('factory');
    const factoryz = await new Promise((resolve, reject) => {
        var factoryzz = [];
        collection.find({}).forEach(
            facto => { factoryzz.push(`${facto.fact_location.fact_lat},${facto.fact_location.fact_long}`); },
            err => {
                if (err) reject(err);
                else resolve(factoryzz);
            }
        ); 
    });
    var dest = factoryz.join('|');
    //console.log(dest);
    return [dest, factoryz];
}

/*
*   Returns the factory with the given latitude and longitude
*   parameters
* 
*/

export async function closestFactory(lat, long) {
    const { db, client } = await connectDB();
    const collection = db.collection('factory');
    const doc = await collection.findOne({ "fact_location.fact_lat": lat, "fact_location.fact_long": long  });
    const facto = new Factory(doc.name, doc.open_time, doc.close_time, doc.fact_location.fact_lat, doc.fact_location.fact_long,
        doc.fact_type, doc.fact_branch_name, doc.fact_status, doc.fact_address_formatted, doc.fact_citycode , doc.address_component.fact_city, doc.address_component.fact_district, doc.address_component.fact_province, 
        doc.address_component.fact_street, doc.address_component.street_number);
    return facto.JSON;

}

export async function read(key) {
    const { db, client } = await connectDB();
    const collection = db.collection('factory');
    const doc = await collection.findOne({ name: key });
    //const docParsed = JSON.parse(doc);
    console.log(doc);
    const facto = new Factory(doc.name, doc.open_time, doc.close_time, doc.fact_location.fact_lat, doc.fact_location.fact_long,
        doc.fact_type, doc.fact_branch_name, doc.fact_status, doc.fact_address_formatted, doc.fact_citycode , doc.address_component.fact_city, doc.address_component.fact_district, doc.address_component.fact_province, 
        doc.address_component.fact_street, doc.address_component.street_number);
    console.log(facto.JSON);
    return facto.JSON; 
}

export async function count() {
    const { db, client } = await connectDB();
    const collection = db.collection('factory');
    const count = await collection.count({});
    return count; 
}

export async function close() {
    if (client) client.close();
    client = undefined;
}



