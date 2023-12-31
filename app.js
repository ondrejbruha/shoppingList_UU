const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ondrab2000:1234@cluster0.idhrxfr.mongodb.net/?retryWrites=true&w=majority");

const usersRouter = require('./routes/users');
const shoppingListRouter = require('./routes/shoppingList');

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use("/api/shoppingList", shoppingListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(8000,()=>{
  console.log("Listening on port 8000");
})

module.exports = app;
