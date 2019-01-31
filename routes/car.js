const router = require('express').Router();
const Car = require('../models').Car
const middleware = require('../helpers/middleware');

//ADMIN

router.get('/', (req, res) => {
  Car.findAll({})
    .then(cars => {
      if (!req.session.userLoggedIn) {
        res.render('cars', { data: cars, navbar: `before`})
      } else {
        res.render('cars', { data: cars, navbar: `after`})
      }
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/admin', middleware('admin'), (req, res) => {
  Car.findAll({})
    .then(cars => {
      res.render('carsAdmin', { data: cars })
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/admin/add', middleware('admin'), (req, res) => {
  res.render('addCar')
})

router.post('/admin/add', middleware('admin'), (req, res) => {
  let newCar = {
    brand: req.body.brand,
    type: req.body.type,
    color: req.body.color,
    year: req.body.year,
    rentalPrice: req.body.rentalPrice,
  }

  Car.create(newCar)
    .then(car => {
      res.redirect('/cars/admin')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/admin/edit/:id', middleware('admin'), (req, res) => {
  Car.findByPk(req.params.id)
    .then(car => {
      res.render('editCar', { data: car })
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/admin/edit/:id', middleware('admin'), (req, res) => {
  Car.update(req.body, { where: { id: req.params.id } })
    .then(() => {
      res.redirect('/cars/admin')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/admin/delete/:id', middleware('admin'), (req, res) => {
  Car.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect('/cars/admin')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/users/rent/:id', middleware('user'),(req, res) => {
  Car.findByPk(req.params.id)
    .then(car => {
      res.render('rentCar', { data: car })
    })
    .catch(err => {
      res.send(err)
    })
})



module.exports = router;