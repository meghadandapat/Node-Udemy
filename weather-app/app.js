const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const process = require("process");

const location = process.argv[2];
console.log(location);
if (location) {
  //callback chaining
  //we can only destructure from objects and not from undefined so we will use default fuc parameter
  geocode(location, (error, { latitute, longitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitute, longitude, (error, forecastdata) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log("It is " + forecastdata + " Celsius.");
    });
  });
} else {
  console.log("Please enter a location.");
}
