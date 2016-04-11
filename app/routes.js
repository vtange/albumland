var User = require('./models/user.js');
var Gallery = require('./models/gallery.js');

// app/routes.js
module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
		if(req.user){
			//send user's home page
			User.findById(req.user.id).populate('galleries').exec(function(err,user){
				res.render('index.ejs', {
					title: app.title,
					user : req.user, // get the user out of session and pass to template
					packagedUser : JSON.stringify([user]) //send user info to angular
				}); // load the index.ejs file
			});
		}
		else{
			//render index page with "recent stuff" galleries
			var galleries;
			res.render('frontpage.ejs', {
				title: app.title,
				user : req.user, // get the user out of session and pass to template
				package : JSON.stringify([req.user]) //send info to angular
			}); // load the index.ejs file
		}
    });
    // =====================================
    // SOMEONE'S PAGE ========
    // =====================================
    app.get('/see/:USERNAME', function(req, res) {
		User.findOne({'local.username': req.params.USERNAME },function(err,user){
			console.log(user);
			if(!user){
				//render 404 page
				res.send(404);
			}
			else{
				if(!req.user){
					res.send("checked other user");
				}
				else{
					console.log(req.user.local.username);
					if(req.params.USERNAME === req.user.local.username){
						console.log(req.params.USERNAME);
						//do the same as '/'
						res.redirect("/");
					}
					else{
						res.send("checked other user");
					}
				}
			}
		});
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