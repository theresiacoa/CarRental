const router = require('express').Router();
const middleware = require('../helpers/middleware')
const User = require('../models').User
const Car = require('../models').Car
const Transaction = require('../models').Transaction

//GOOGLE API KEY
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.google_map_api,
  Promise: Promise
});


//location
router.get('/', middleware(), (req, res) => {
  if (req.session.userLoggedIn.status === 'user') {
    User.findByPk(req.session.userLoggedIn.id, {
      include: [{ model: Car }]
    })
    .then(rent => {
      res.render('booking_user.ejs', { data: rent.Cars })
      // res.send(rent)
    })
    .catch(err => {
      res.send(err)
    })
  } else {
    res.render('booking_admin.ejs')
  }
})

router.post('/location', middleware('admin'), (req, res) => {
  googleMapsClient.geocode(
    { address: '1600 Amphitheatre Parkway, Mountain View, CA' }
  )
    .asPromise()
    .then((response) => {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: { lat: -28.024, lng: 140.887 }
      });

      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
          position: location,
          label: labels[i % labels.length]
        });
      });
      var markerCluster = new MarkerClusterer(map, markers,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
      // console.log(response.json.results[0]);
      // console.log(response.json.results[0].geometry.location.lat); or lng
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get('/location/maps', (req, res) => {
  Model.Transaction.findAll()
    .then((data) => {
      var geocoder = new google.maps.Geocoder();
      var address = "new york";

      geocoder.geocode({ 'address': address }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          alert(latitude);
        }
      });
      res.render('googlemaps.ejs', { key: process.env.google_map_api });
    })

    .catch(err => {
      res.send(err)
    })

})



module.exports = router;