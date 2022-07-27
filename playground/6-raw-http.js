const https = require("https");
const url =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Boston.json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1IjoibWVnaGFkYW5kYXBhdCIsImEiOiJja3Zwa3JkZTAzdWtmMm9xNXNuN2N6M3kwIn0.dvRI_iBjP9MEl35GohqrWw&limit=1";

const request = https.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    console.log(JSON.parse(data));
  });
});

request.end();
