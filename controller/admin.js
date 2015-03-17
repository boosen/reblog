var settings = require('../setting');

exports.login = function(req, res, next) {
	if(req.body.email != settings.loginUser || req.body.password != settings.loginPwd) {
		return res.redirect('/login');
	} else {
		req.session.username = 'Bushen';
		return res.redirect('/admin/index');
	}
};

exports.loginView = function(req, res, next) {
	return res.render('admin/login');
}

exports.index = function(req, res) {
	return res.render('admin/index', {isDBActive:true});
}

exports.checkLogin = function(req, res, next) {
	if (!req.session.username) {
		res.redirect('/login');
	}
	return next();
}

exports.logOut = function(req, res) {
	req.session.username = null;
	return res.redirect('/login');
}

exports.manageBlog = function(req, res) {
	res.render('admin/manage_blog', {isMBActive:true})
}

exports.postBlogView = function(req, res) {
	res.render('admin/post_blog');
}