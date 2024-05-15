var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// CORS 설정
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// 데이터베이스 동기화
const database = require("./lib/Model");

database.Node_db
  .sync({ force: false })
  .then(() => {
    console.log("Node_db synchronized successfully.");
  })
  .catch((error) => {
    console.error("Failed to synchronize Node_db:", error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 라우터 파일을 가져옵니다.
require('./lib/routes/login/SignUpRoutes')(app);
require('./lib/routes/Manager/RegistrationRoutes')(app);
require('./lib/routes/Menu/DetailMenuRoutes')(app);

// 404 에러 핸들링
app.use(function(req, res, next) {
  next(createError(404));
});

// 에러 핸들링
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
