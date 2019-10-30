const fact_name  = Symbol('name');
const fact_open_time  = Symbol('open_time');
const fact_close_time  = Symbol('close_time');
const fact_lat  = Symbol('latitude');
const fact_long  = Symbol('longitude');
const fact_location = Symbol('location');
// const location_name = Symbol('location');
const fact_type = Symbol('type');
const fact_status = Symbol('status');
const fact_branch_name = Symbol('location_name');
const fact_address_formatted  = Symbol('formatted_address');
const fact_city = Symbol('city');
//const fact_business = Symbol('business');
const fact_district = Symbol('district');
const fact_province = Symbol('province');
const fact_street = Symbol('fact_street');
const fact_street_number = Symbol('street_number');
const fact_citycode = Symbol('citycode');
const address_component = Symbol('address_component');


export default class Factory {
    constructor(name, open_time, close_time, latitude, longitude,
        type, branch_name, status, fact_mat_address, citycode ,city, district, province, street, street_number) {
            this[fact_name] = name;
            this[fact_open_time] = open_time;
            this[fact_close_time] = close_time;
            this[fact_location] = { "lng": this[fact_long] = longitude, "lat": this[fact_lat] = latitude };
            this[fact_type] = type;
            this[fact_branch_name] = branch_name; 
            this[fact_status] = status;
            // this[fact_location_name] = location_name;
            this[fact_address_formatted] = fact_mat_address;
            this[fact_citycode] = citycode
            this[address_component] = {
                "city": this[fact_city] = city,
                "district": this[fact_district] = district,
                "province": this[fact_province] = province,
                "street": this[fact_street] = street,
                "street_number": this[fact_street_number] = street_number,
            };
    }

    get name() { return this[fact_name]; }
    get open_time() { return this[fact_open_time]; }
    get close_time() { return this[fact_close_time]; }
    get fact_lat() { return this[fact_lat]; }
    get fact_long() { return this[fact_long]; }
    get fact_type() { return this[fact_type]; }
    get fact_status() { return this[fact_status]; }
    get fact_branch_name() { return this[fact_branch_name]; }
    get fact_address_formatted() { return this[fact_address_formatted]; }
    get fact_citycode() { return this[fact_citycode]; }
    get fact_city() { return this[fact_city]; }
    get fact_district() { return this[fact_district]; }
    get fact_province() { return this[fact_province]; }
    get fact_street() { return this[fact_street]; }
    get fact_street_number() { return this[fact_street_number]; }
    set name(newName) { this[fact_name] = newName; }
    set open_time(newOpentime) { this[fact_open_time] = newOpentime; }
    set close_time(newClosetime) { this[fact_close_time] = newClosetime; }
    set fact_lat(newLatit) { this[fact_lat] = newLatit; }
    set fact_long(newLongit) { this[fact_long] = newLongit; }
    set fact_type(newType) { this[fact_type] = newType; }
    set fact_status(newStatus) { [fact_status] = newStatus; }
    set fact_branch_name(newBranchname) { this[fact_branch_name] = newBranchname; }
    set fact_address(newAddress) { this[fact_address_formatted] = newAddress; }

    get JSON() {
        return JSON.stringify({
            name: this.name,
            open_time: this.open_time,
            close_time: this.close_time,
            fact_location: { fact_long: this.fact_long, fact_lat: this.fact_lat },
            fact_type: this.fact_type,
            fact_branch_name: this.fact_branch_name,
            fact_status: this.fact_status,
            fact_address_formatted: this.fact_address_formatted,
            fact_citycode: this.fact_citycode,
            address_component: {
                fact_city: this.fact_city,
                fact_district: this.fact_district,
                fact_province: this.fact_province,
                fact_street: this.fact_street,
                street_number: this.fact_street_number
            }
        }, null, 4);
    }

    static fromJSON(json) {
        var data = JSON.parse(json);
        var factory = new Factory(data.name, data.open_time, data.close_time,
            data.fact_lat, data.fact_long, data.fact_type, data.fact_branch_name, data.fact_status,
            data.fact_address_formatted, data.fact_citycode, data.fact_city, 
            data.fact_district, data.fact_province, data.fact_street, data.fact_street_number);
        return factory;
    }

}; 
