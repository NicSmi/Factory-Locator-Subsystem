import Order from '../model/order.mjs';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

var client;

async function connectDB() {
    if (!client) client = await MongoClient.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true});
    return {
        db: client.db(process.env.MONGO_DBNAME),
        client: client
    };
}

// Add an order to database

export async function add(addr, lat, lng) {
    const { db, client } = await connectDB();
    const order = new Order(addr, lat, lng);
    const ordJSON = order.JSON;
    const ordParsed = JSON.parse(ordJSON);
    const collection = db.collection('order');
    await collection.insertOne(ordParsed);
    return ordJSON;
}

// find all order coordinates 

export async function findAllOrderCoordinates(){
    const { db, client } = await connectDB();
    const collection = db.collection('order');
    const orderloc = await new Promise((resolve, reject) => {
        var locationz = [];
        collection.find({}).forEach(
            order => { 
                var v = {latitude: order.order_lat, longitude: order.order_lng}
                locationz.push(v);},
            err => {
                if (err) reject(err);
                else resolve(locationz);
            } 
        );
    });
    //console.log(orderloc);
    return orderloc;
}