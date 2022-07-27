const request = require("postman-request");
const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=80200a268bde14cb3f8acf021fae07fd&query=" +
    lat +
    "," +
    long +
    "#";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather api", undefined);
    } else if (body.success) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        forecast: body.current.weather_descriptions,
        humidity: body.current.humidity,
      });
    }
  });
};
module.exports = forecast;
