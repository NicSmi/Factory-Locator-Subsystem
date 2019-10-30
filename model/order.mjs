const order_formatted_address = Symbol('order_address');
const order_lat = Symbol('o_lat');
const order_lng = Symbol('o_lng');

export default class Order {
    constructor(order_address, order_la, order_ln) {
        this[order_formatted_address] = order_address;
        this[order_lat] = order_la;
        this[order_lng] = order_ln;
    }

    get order_formatted_address(){ return this[order_formatted_address]; }
    get order_latitude(){ return this[order_lat]; }
    get order_longitude(){ return this[order_lng]; }
    set order_formatted_address(newAddress){ this[order_formatted_address] = newAddress; }
    set order_latitude(newLatitude){ this[order_lat] = newLatitude };
    set order_longitude(newLongitude){ this[order_lng] = newLongitude };

    get JSON() {
        return JSON.stringify({
            order_formatted_address: this.order_formatted_address,
            order_lat: this.order_latitude,
            order_lng: this.order_longitude
        }, null, 4);
    }

    static fromJSON(json) {
        var data = JSON.parse(json);
        var order = new Order(data.order_formatted_address, data.order_lat, 
            data.order_lng);
        return order;
    }


}
