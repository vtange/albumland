// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var gravatar = require('gravatar');

// define the schema for our user model
var userSchema = mongoose.Schema({
	galleries        : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gallery' }],
    local            : {
        username     : String,
        email        : String,
        password     : String,
		avatarURL	 : String,
		resetPasswordToken: String,
		resetPasswordExpires: Date
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// generate gravatar link
userSchema.methods.generateGravatar = function(email) {
    return gravatar.url(email, {s: '200', r: 'pg', d: '404'});
};

userSchema.pre('save', function(next) {
    // if galleries is empty, push a mock first gallery
	if (!this.galleries.length){
		var gall = new Gallery();
		gall.name = "First Gallery";
		gall.pics = [];
		this.galleries.push(gall);
	}
	next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
