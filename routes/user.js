const router = require('express').Router();
const Model = require('../models');
const nodemailer = require("nodemailer");

//SMTP
// var transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "	activefox.carrental@gmail.com",
//     pass: "carrental123"
//   }
// });
// var rand, mailOptions, host, link;

router.get('/', (req, res) => {
  res.redirect('/user/register');
})

//REGISTRATION
router.get('/register', (req, res) => {
  res.render('navbarPages/register.ejs', {
    purpose: 'register', err: null
  })
})

router.post('/register', (req, res) => {
  // res.send(req.body);
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  // res.send(newUser);
  Model.User.create(newUser)
    .then((data) => {
  //     res.redirect('/login')
    })
    .catch(err => {
  //     // res.render('navbarPages/register.ejs', {
  //     //   purpose: 'login', err: err
  //     // })
  //     console.log(err)
      res.send(err);
    })
})

// router.get('/send', function (req, res) {
//   rand = Math.floor((Math.random() * 100) + 54);
//   host = req.get('host');
//   link = "http://" + req.get('host') + "/verify?id=" + rand;
//   mailOptions = {
//     to: req.query.to,
//     subject: "Please confirm your Email account",
//     html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
//   }
//   console.log(mailOptions);
//   smtpTransport.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       console.log(error);
//       res.end("error");
//     } else {
//       console.log("Message sent: " + response.message);
//       res.end("sent");
//     }
//   });
// });

//LOGIN
router.get('/login', (req, res) => {
  res.render('navbarPages/register.ejs', {
    purpose: 'login'
  })
})

router.post('/login', (req, res) => {

})
module.exports = router;
