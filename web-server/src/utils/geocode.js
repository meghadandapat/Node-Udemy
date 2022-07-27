const request = require("postman-request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1IjoibWVnaGFkYW5kYXBhdCIsImEiOiJja3Zwa3JkZTAzdWtmMm9xNXNuN2N6M3kwIn0.dvRI_iBjP9MEl35GohqrWw&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find coordinates", undefined);
    } else {
      callback(undefined, {
        latitute: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
