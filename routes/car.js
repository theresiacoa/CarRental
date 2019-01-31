const router = require('express').Router();
const Car = require('../models').Car
const Transaction = require('../models').Transaction
const middleware = require('../helpers/middleware');
const total = require('../helpers/totalPrice')


//ADMIN

router.get('/', (req, res) => {
  Car.findAll({})
    .then(cars => {
      res.render('cars', { data: cars })
    })
    .catch(err => {
      res.send(err)
    })
})
router.get('/users/rent/:id', middleware('user'), (req, res) => {
// router.get('/users/rent/:id', (req, res) => {
  Car.findByPk(req.params.id)
    .then(car => {
      res.render('rentCar', { data: car })
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/users/rent/:id', middleware('user'), (req, res) => {
// router.post('/users/rent/:id', (req, res) => {
  let transaction = {
    UserId: req.session.userLoggedIn.id,
    CarId: req.params.id,
    rentalDate: req.body.date,
    totalPrice: total(req.body.day,req.body.price),
    status : 'unpaid',
    address: req.body.address
  }

  // res.send(transaction)

  Transaction.create(transaction)
    .then(rent => {
      // res.redirect('/user/booking')
      res.send('transaksi berhasil')
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


module.exports = router;

