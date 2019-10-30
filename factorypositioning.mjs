
/*
*   Calculate the center/average of multiple Geolocation coordinates
*   This function takes an array of objects with .latitude and .longitude properties
*/



export default function centreGeolocator(points) {
    if (points.length === 1) {
        return points[0];
    }

    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

    for (let point of points) {
        let latitude = point.latitude * Math.PI / 180;
        let longitude = point.longitude * Math.PI / 180;

        x += Math.cos(latitude) * Math.cos(longitude);
        y += Math.cos(latitude) * Math.sin(longitude);
        z += Math.sin(latitude);
    }

    let total = points.length;

    x = x / total;
    y = y / total;
    z = z / total;

    let centralLongitude = Math.atan2(y, x);
    let centralSquareRoot = Math.sqrt(x * x + y * y);
    let centralLatitude = Math.atan2(z, centralSquareRoot);

    return {
        latitude: centralLatitude * 180 / Math.PI,
        longitude: centralLongitude * 180 / Math.PI
    };
 }

function tester(){
    var v = centreGeolocator([{latitude:37.797749, longitude:-122.412147},{latitude:37.789068 ,longitude:-122.390604},{latitude:37.785269, longitude:-122.421975}]);
    console.log(v);
}


