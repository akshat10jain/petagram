const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local.signup', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true


}, function (req, email, password, done) {

    User.findOne({ 'email': email }, function (err, user) {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false,{message:'unknown user'});
        }

        var user = new User();
        user.username = req.body.username
        user.email = req.body.email
        user.password = req.body.password
        user.name = req.body.name
        user.save(function (err) {
            if (err) {
                return done(err)
            }
            return done(null, user)
        })
    })

}))




passport.use('local.signin', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true


}, function (req, email, password, done) {

    User.findOne({ 'email': email }, function (err, user) {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false);
        }

        if (!user.comparePassword(req.body.password)) {
            return done(null, false)
        }

        return done(null, user)

    })

}))


