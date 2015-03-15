module.exports = function(app) {
	
	app.get('/', function(req, res) {
		// res.render('index', {title:'Reblog'});
		res.redirect('/login');
	})

	var admin = require('../controller/admin');

	app.all('/admin/*', admin.checkLogin);
	app.route('/login')
			.get(admin.loginView)
			.post(admin.login);
	app.get('/admin/index', admin.index);
	// var blog = require('./blog');
};