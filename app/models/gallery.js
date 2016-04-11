// app/models/gallery.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var gallerySchema = mongoose.Schema({
	name :	String,
	pics :  [String]
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Gallery', gallerySchema);
