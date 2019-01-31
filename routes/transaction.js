const router = require('express').Router();
const middleware = require('../helpers/middleware')

//GOOGLE API KEY
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.google_map_api
});

//location
router.get('/', middleware(), (req, res) => {
  if (req.session.userLoggedIn.status === 'user') {
    res.render('booking_user.ejs')
  } else {
    res.render('booking_admin.ejs')
  }
})

router.post('/location', (req, res) => {
  googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function (err, response) {
    if (!err) {
      console.log(response.json.results);
    }
  });
})



module.exports = router;