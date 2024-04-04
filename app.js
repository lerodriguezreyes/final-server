var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose')

// require routes
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth'); 
var commentsRouter = require('./routes/comments');
var billsRouter = require('./routes/bills');
var photosRouter = require('./routes/photos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.enable('trust proxy');

// cors middleware before the routes
app.use(
    cors({
      origin: [process.env.REACT_APP_URI],
    })
  );

// routes configuration
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/comments', commentsRouter);
app.use("/bills", billsRouter);
app.use('/photos', photosRouter);

//mongoose configuration
mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected to 🫡  Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB 😣", err));

module.exports = app;
