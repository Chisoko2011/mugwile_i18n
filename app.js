var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');

// require modules
var app = express();
var http = require('http');
  

i18n.configure({
	locales: [ 'en','de','fr'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en'
})

app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);



app.post('/login', function (req, res) {
 
  // catch the variables 
  var un = req.body.userfirstname;
  var pw = req.body.userpassword;
  
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');

  
 // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "Kawambwa1*"
  });
  
  
 
 
 
 con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM  trafficlogin WHERE username = '"+un+"' AND userpassword ='"+pw+"';", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
	
	if(result.length>0){
		res.send('login valid');
		
	} else {
		res.send("");		
	
	}
	
  });
});
 
  
    
    
    
  });
  
  
  


app.post('/putInDatabase', function (req, res) {
  
  var offender_name = req.body.offendername;
  var offender_email = req.body.offenderemail;
  var offender_location = req.body.offenderlocation;
  var offender_offense= req.body.offenderoffense;
  console.log()
  
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');

  
 // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "Kawambwa1*"
  });
  
  
  con.connect(function(err) {
	  
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO crime (offender_name, offender_email, offender_location, offender_offense ) VALUES ('"+offender_name+"','"+offender_email+"', '"+offender_location+"', '"+offender_offense+"'  );";
  

  
  console.log(sql);
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
  res.send('Data went to the database');
  
  
})
  
 
 
 
 
  
  
  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
