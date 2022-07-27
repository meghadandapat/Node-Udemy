const path = require("path");
const express = require("express"); //express is a func
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000;
//define absolute path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location(if you are renaming views folder or changing its location)
app.set("views", viewsPath);
app.set("view engine", "hbs");
//for setting up partials
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "dummy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Megha Dandapat",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Megha Dandapat",
    msg: "How can I assist you?",
  });
});

//Two arg: route, func

//Send HTML
// app.get("/", (req, res) => {
//   res.send("<h1>hello</h1>");
// });

// //send JSON
// app.get("/help", (req, res) => {
//   res.send({
//     name: "Megha",
//     age: "20",
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ address: "not found" });
  }
  //if we try to destructure when no object is passed then program will crash so we use default parameter
  geocode(
    req.query.address,
    (error, { latitute, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(
        latitute,
        longitude,
        (error, { temperature, forecast, humidity } = {}) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            location,
            temperature,
            forecast,
            humidity,
            address: req.query.address,
          });
        }
      );
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    msg: "Help article not found",
  });
});

//every url that hasn't been listed so far
app.get("*", (req, res) => {
  res.render("notFound", {
    msg: "Page not found",
  });
});
//start up server
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
