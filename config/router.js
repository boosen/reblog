module.exports = function(app) {
	var home = require('../controller/home');

	app.get('/', home.index)

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
		.get(blog.editBlogView)
		.post(blog.editBlog)
		.delete(blog.deleteBlog);
			
	// var blog = require('./blog');
};