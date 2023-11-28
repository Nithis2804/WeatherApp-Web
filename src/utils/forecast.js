const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=953f7aa5f17a888704a1434b3dd2b70b&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longtitude);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to the Internet! Check your Connection!",
        undefined
      );
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "The weather is " +
          body.current.temperature +
          " It feels like " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
