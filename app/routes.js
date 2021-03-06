var User = require('./models/user.js');
var Gallery = require('./models/gallery.js');

// app/routes.js
module.exports = function(app) {
var recentLinks = [];
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
			var front_page_user = {
				galleries:[{name:"Recently Added",pics:recentLinks},{name:"Popular",pics:[]}]
			};
			res.render('viewonly.ejs', {
				title: app.title,
				user : req.user, // get the user out of session and pass to template
				package : JSON.stringify([front_page_user]) //send info to angular
			}); // load the index.ejs file
		}
    });
    // =====================================
    // SOMEONE'S PAGE ========
    // =====================================
    app.get('/:USERNAME', function(req, res) {
		User.findOne({'local.username': req.params.USERNAME }).populate('galleries').exec(function(err,user){
			if(!user){
				//render 404 page
				res.send(404);
			}
			else{
				if(!req.user){
					res.render('viewonly.ejs', {
						title: app.title,
						user : req.user, // get the user out of session and pass to template
						package : JSON.stringify([user]) //send info to angular
					}); // load the index.ejs file
				}
				else{
					if(req.params.USERNAME === req.user.local.username){
						//do the same as '/'
						res.redirect("/");
					}
					else{
						res.render('viewonly.ejs', {
							title: app.title,
							user : req.user, // get the user out of session and pass to template
							package : JSON.stringify([user]) //send info to angular
						}); // load the index.ejs file
					}
				}
			}
		});
    });
    // =====================================
    // NEW GALLERY ========
    // =====================================
    app.post('/newGall', function(req, res) {
		if(req.user){
			var user = req.user;
			var gall = new Gallery();
			gall.name = req.body.newGall;
			gall.pics = [];
			gall.save(function(err){
				if(err)
					throw err;
				user.galleries.push(gall);
				user.save(function(err){
					if(err)
						throw err;
					console.log('user has new gall');
				});
				res.send(gall);
			});
		}
		else{
			res.redirect('/');
		}
	});
    // =====================================
    // NEW IMAGE ========
    // =====================================
    app.post('/newImg', function(req, res) {
		if(req.user){
			var user = req.user;
			User.findById(req.user.id).populate('galleries').exec(function(err,user){
				//push string url
				user.galleries[req.body.currIndex].pics.push(req.body.newImg);
				//save gallery
				user.galleries[req.body.currIndex].save(function(err){
					if(err)
						throw err;
					recentLinks.push(req.body.newImg);
					res.send(req.body.newImg);
				});
			});
		}
		else{
			res.redirect('/');
		}
	});
    // =====================================
    // DEL IMAGE ========
    // =====================================
    app.post('/delImg', function(req, res) {
		if(req.user){
			var user = req.user;
			User.findById(req.user.id).populate('galleries').exec(function(err,user){
				//push string url
				user.galleries[req.body.currIndex].pics.splice(user.galleries[req.body.currIndex].pics.indexOf(req.body.delUrl),1);
				//save gallery
				user.galleries[req.body.currIndex].save(function(err){
					if(err)
						throw err;
					res.send(200);
				});
			});
		}
		else{
			res.redirect('/');
		}
	});
    // =====================================
    // DEL GALLERY ========
    // =====================================
    app.post('/delGall', function(req, res) {
		if(req.user){
			var user = req.user;
			User.findById(req.user.id).populate('galleries').exec(function(err,user){
				//delete gallery
				user.galleries.splice(req.body.currIndex,1);
				//save gallery
				user.galleries[req.body.currIndex].save(function(err){
					if(err)
						throw err;
					res.send(200);
				});
			});
		}
		else{
			res.redirect('/');
		}
	});
    // =====================================
    // GALLERY NAME CHANGE ========
    // =====================================
    app.post('/nameChange', function(req, res) {
		if(req.user){
			var user = req.user;
			User.findById(req.user.id).populate('galleries').exec(function(err,user){
				//change name
				user.galleries[req.body.currIndex].name = req.body.editGall;
				//save gallery
				user.galleries[req.body.currIndex].save(function(err){
					if(err)
						throw err;
					res.send(req.body.editGall);
				});
			});
		}
		else{
			res.redirect('/');
		}
	});
};