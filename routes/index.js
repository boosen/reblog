module.export = function(app) {
	
	var user = require('../controller/user');
	app.get('/login', user.loginView);
	app.post('/login', user.loginView);
	app.route('login')
			// .all(user.loginAll)
			.get(user.loginView)
			.post(user.login);

	var blog = require('./blog');
}