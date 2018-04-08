const express = require('express')
const bodyParser = require('body-parser')
const path=require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport=require('passport')
const expressValidator=require('express-validator')

const session = require('express-session')
const cookieParser = require('cookie-parser')

const connect = require('./db/connect')

const index=require('./routes/index')
const users = require('./routes/users')

// require('./config/passport')
require('./config/passport')

const app = express()

//logging all request
app.use(morgan('dev'))
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// set static folder
app.use(express.static(__dirname + '/public'))

//express-session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave:true
  }));

//passport initialization
app.use(passport.initialize())
app.use(passport.session())

  // Express-validator
app.use(expressValidator({
	errorFormatter: function (param, msg, value) {
		var namespace = param.split('.'),
			root = namespace.shift(),
			formParam = root;

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));


app.use('/',index)
app.use('/users', users);


app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname+'/public/views/index.html'))
})


app.listen(process.env.PORT || 3000, () => { console.log('server started') })