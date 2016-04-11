var User = require('./models/user.js');
var Gallery = require('./models/gallery.js');

// app/routes.js
module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
		if(req.user){
			res.render('index.ejs', {
				title: app.title,
				user : req.user, // get the user out of session and pass to template
				packagedUser : JSON.stringify([req.user]) //send user info to angular
			}); // load the index.ejs file
		}
		else{
			res.render('frontpage.ejs', {
				title: app.title,
				user : req.user, // get the user out of session and pass to template
				package : JSON.stringify([req.user]) //send info to angular
			}); // load the index.ejs file
		}
    });
    // =====================================
    // NEW GALLERY ========
    // =====================================
    app.post('/newGall', function(req, res) {
		//if(req.user){
			var user = req.user;
			var gall = new Gallery();
			gall.name = req.body.newGall;
			gall.pics = [];
			gall.save(function(err){
				if(err)
					throw err;
				//user.galleries.push(gall);
				//user.save(function(err){
				//	if(err)
				//		throw err;
				//	console.log('user has new gall');
				//});
				res.send(gall);
			});
		//}
		//else{
		//	res.redirect('/');
		//}
	});
};