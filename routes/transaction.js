const router = require('express').Router();
const middleware = require('../helpers/middleware');
const Model = require('../models');

//GOOGLE API KEY
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.google_map_api,
  Promise: Promise
});

//location
router.get('/', middleware(), (req, res) => {
  if (req.session.userLoggedIn.status === 'user') {


    res.render('booking_user.ejs')



  } else {
    Model.User.findAll({ include: Model.Car })
      .then(allData => {
        let completedData = [];
        for (let i = 0; i < allData.length; i++) {
          if (!allData[i].Cars) {
            break;
          } else {
            for (let j = 0; j < allData[i].Cars.length; j++) {
              completedData.push({
                fullName: allData[i].getFullName(),
                email: allData[i].email,
                brand: allData[i].Cars[j].brand,
                type: allData[i].Cars[j].type,
                color: allData[i].Cars[j].color,
                year: allData[i].Cars[j].year,
                rentalPrice: allData[i].Cars[j].rentalPrice,
                rentalDate: allData[i].Cars[j].Transaction.rentalDate,
                totalPrice: allData[i].Cars[j].Transaction.totalPrice,
                status: allData[i].Cars[j].Transaction.status,
                address: allData[i].Cars[j].Transaction.address
              })
            }
          }
        }
        // res.send(completedData)
        // res.send(allData);
        res.render('booking_admin.ejs', { data: completedData })
      })
      .catch(err => {
        res.send(err);
      })
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
  // var geocoder = new google.maps.Geocoder();
  // var address = "new york";

  // geocoder.geocode({ 'address': address }, function (results, status) {

  //   if (status == google.maps.GeocoderStatus.OK) {
  //     var latitude = results[0].geometry.location.lat();
  //     var longitude = results[0].geometry.location.lng();
  //     alert(latitude);
  //   }
  // });
  res.render('googlemaps.ejs', { api: process.env.google_map_api });
})



module.exports = router;