const request = require("request");
const geocode = (address, callback) => {
  const url =
    "http://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoibml0aGlzcmFqIiwiYSI6ImNscGNrc3N1MDBxM28yanFyMnp0eHI2NGQifQ.ciPI4og5bBqdDaM40cTB6A&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to the Internet! Check your Connection!",
        undefined
      );
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1], //center[1],
        longtitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
