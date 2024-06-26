const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
//const mongoConnect=require("./util/database").mongoConnect;
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const User=require('./models/user');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6658a55da585102c3f84f4e0')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://arunklt21:884vCCrMuPJbujgN@mongodbtest.jlnffhd.mongodb.net/?retryWrites=true&w=majority&appName=Mongodbtest'
  )
  .then(result => {
    //console.log('connected:',result);
    User.findOne().then(user => {
      if (!user) {
        const user=new User({
          name:'arun',
          email:'arun@gmail.com',
          mobileno:'88004538938',
          cart:{
            items:[]
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });