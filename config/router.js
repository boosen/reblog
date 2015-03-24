module.exports = function(app) {
	
	app.get('/', function(req, res) {
		// res.render('index', {title:'Reblog'});
		res.redirect('/login');
	})

	var admin = require('../controller/admin');
	var blog = require('../controller/blog');

	app.all('/admin/*', admin.checkLogin);
	app.route('/login')
		.get(admin.loginView)
		.post(admin.login);
	app.get('/logout', admin.logOut);
	app.get('/admin/index', admin.index);

	app.get('/admin/manage-blog', blog.manageBlog);

	app.route('/admin/post-blog')
		.get(blog.postBlogView)
		.post(blog.postBlog);

	app.route('/admin/blog/:id')
		.delete(blog.deleteBlog);
			
	// var blog = require('./blog');
};