const router = require('express').Router();
const Model = require('../models');
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
    Model.User.findAll({ include: Model.Car })
      .then(allData => {
        let completedData = [];
        for (let i = 0; i < allData.length; i++) {
          if (!allData[i].Cars) {
            break;
          } else {
            for (let j = 0; j < allData[i].Cars.length; j++) {
              completedData.push({
                id: allData[i].id,
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
        res.render('booking_admin.ejs', { data: completedData })
      })
      .catch(err => {
        res.send(err);
      })
  }
})

router.get('/location/maps', middleware('admin'), (req, res) => {
  Transaction.findAll()
    .then((data) => {
      let allAddress = [];
      data.forEach(e => {
        allAddress.push({ address: e.address });
      });
      res.render('googlemaps.ejs', { api: process.env.google_map_api, locations: JSON.stringify(allAddress) });
    })
    .catch(err => {
      res.send(err);
    })

})

router.post('/:id/updateStatus', (req, res) => {
  Model.Transaction.findOne({
    where: { UserId: req.params.id }
  })
    .then((data) => {
      if (data) {
        return Model.Transaction.update({ status: 'paid' }, {
          where: {
            UserId: req.params.id
          }
        })
      } else {
        throw `there's no user by that ID`
      }
    })
    .then(() => {
      res.redirect('/booking')
    })
    .catch((err) => {
      res.send(err);
    })
})



module.exports = router;