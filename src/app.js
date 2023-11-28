const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Dfeine paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, "../templates/partials");

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//setup handlebar engines and views locations
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPaths);
//app.set("views", path.join(__dirname, "../templates")); //not needed
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nithis Raj",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nithis Raj",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Nithis Raj",
  });
});

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address needed",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// res.send({
//   forecast: "It is snowing",
//   location: "Philadelphia",
//   address: req.query.address,
// });
// });

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Query needed",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nithis Raj",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nithis Raj",
    errorMessage: "page not found",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
