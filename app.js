
const express = require('express');
const app = express();
const carRoutes = require('./routes/car')
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction')
const session = require('express-session')

require('dotenv').config();

app.use(session({
  secret: "carRental"
}))

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
  if (!req.session.userLoggedIn) {
    res.render(`navbarPages/home.ejs`, {navbar: 'before'});
  } else {
    res.render(`navbarPages/home.ejs`, {navbar: 'after'});
  }
})

app.use('/user', userRoutes)
app.use('/cars', carRoutes)
app.use('/booking', transactionRoutes)

app.get('/session', (req, res) => {
  res.send(req.session);
})

app.listen(3000, () => {
  console.log(`listening to PORT ---- 3000`);
})