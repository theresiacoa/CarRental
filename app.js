const express = require('express');
const app = express();
const carRoutes = require('./routes/car')
const userRoutes = require('./routes/user');

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
  res.render(`navbarPages/home.ejs`);
})

app.use('/users', userRoutes)
app.use('/cars', carRoutes)

app.listen(3000, () => {
  console.log(`listening to PORT ---- 3000`);
})