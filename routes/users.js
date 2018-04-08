const express = require('express');
const router = express();
const User = require('../models/user')
const passport=require('passport')


//Register
router.get('/register', (req, res) => {
    res.send('register')
})

//Login
router.get('/login', (req, res) => {
    res.send('login')
})


// //user registration route
// router.post('/register', (req, res) => {
//     var user = new User();
//     user.username = req.body.username
//     user.email = req.body.email
//     user.password = req.body.password
//     user.name = req.body.name
//     if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' || req.body.name == null || req.body.name == '') {
//         res.json({ success: false, message: 'Ensure username ,password, and email,name were provided' })
//     } else {
//         user.save((err) => {
//             if (err) {
//                 res.json({ success: false, message: 'email already exist!' })
//             } else {
//                 res.json({ success: true, message: 'user created' })
//             }
//         });
//     }
// })


// passport.use(new LocalStrategy(
//     function (username, password, done) {

//         User.getUserByUsername(username, (err, user) => {
//             if (err) throw err
//             if (!user) {
//                 return done(null, false, { message: 'Unknown user' })
//             }
//             User.comparePassword(password, user.password, (err, isMatch) => {
//                 if (err) throw err
//                 if (isMatch) {
//                     return done(null, user)

//                 } else {
//                     return done(null, false, { message: 'Invalid password' })
//                 }
//             })
//         })


//     }
// ));

router.post('/register',
    passport.authenticate('local.signup', { successRedirect: '/users/login', failureRedirect: '/users/register' })
);



router.post('/login',
    passport.authenticate('local.signin', { successRedirect: '/', failureRedirect: '/users/login' })
);

// //user login route
// router.post('/login', (req, res) => {
//     User.findOne({ username: req.body.username }).exec((err, user) => {
//         if (err) throw err;
//         if (!user) {
//             res.json({ success: false, message: 'could not found' })
//         } else if (user) {
//             if (req.body.password) {
//                 var validPassword = user.comparePassword(req.body.password);
//             } else {
//                 res.json({ success: false, message: 'No password provided' })
//             }
//             if (!validPassword) {
//                 res.json({ success: false, message: 'not authenticate password!' })
//             } else {
//                 var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' })
//                 res.json({ success: true, message: 'User autheticated!', token: token })
//             }
//         }
//     })
// })

// //middleware to verify token
// router.use((req, res, next) => {
//     var token = req.body.token || req.body.query || req.headers['x-access-token']
//     if (token) {
//         jwt.verify(token, secret, (err, decoded) => {
//             if (err) {
//                 res.json({ success: false, message: 'token invalid' })
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         })
//     } else {
//         res.json({ success: false, message: 'No token provided' })
//     }
// })

// router.post('/me', (req, res) => {
//     res.send(req.decoded)
// })


module.exports = router


