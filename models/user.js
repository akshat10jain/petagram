const mongoose = require('mongoose');
var bcrypt = require('bcrypt')

const Schema = mongoose.Schema

var UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});


UserSchema.pre('save', function (next) {
    var user = this;
    const saltRounds = 12;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

// UserSchema.methods.encryptPassword=function(password){
//     return bcrypt.hashSync(password , bcrypt.genSaltSync(10), null)
// }


UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
}

// UserSchema.statics.getUserByUsername = (username, callback) => {
//     var query = { username: username }
//     User.findOne(query, callback)
// }
// UserSchema.statics.comparPassword = (candidatePassword, hash, callback) => {
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//         if (err) throw err
//         callback(null, isMatch)
//     })
// }

// UserSchema.statics.getUserById = (id, callback) => {

//     User.findById(id, callback)
// }



 module.exports = mongoose.model('User', UserSchema)