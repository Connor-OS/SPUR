const nunjucks = require('nunjucks');
const mongoose = require("mongoose");
import dotenv from "dotenv";
import Stripe from "stripe";


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

import router from "./controllers/routes";

dotenv.config()
const app = express();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


const MONGO_URL = process.env.MONGO_URL

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// set up the template engine
const nunjucksEnv = nunjucks.configure([
  "views",
], {
  autoescape: true,
  express: app,
});

mongoose.connect(MONGO_URL).then(()=>{
  console.log("Mongo is connected successfully!")
}).catch((error) => console.log(error))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
