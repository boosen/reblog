var settings = require('../setting');
var marked = require('marked');
var env = require('jsdom').env;
var ArticleSub = require('../articleSub');

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


//  admin - blog
  
var postPre = function(req,res, callback) {
  req.assert('title', 'title should be required').notEmpty();
  req.assert('content', 'content shouldn\'t be empty').notEmpty();
  var errors = req.validationErrors();
  if(errors) {
    res.json({
      err: errors,
      success: false
    });
  } else {
    var content = req.body.content,
        contentHtml = marked(content),
        title = req.body.title,
        tags = req.body.tags.trim().split('/\s+/g'),
        imgs = [].
        img = '',
        text = ArticleSub.subArtc(text, 200).toString() + '',
        contentBegin = text.replace(/<img.*?>/ig, ""),
        date = new Date(),
        ip = req.ip;
    var html = "<html><body></body></html>";
        env(html, function(errors, window){
          var $ = require('jquery')(window);
          $('body').append(contentHtml);
          $('img').each(function(index){
            imgs.push($(this).attr('src'));
            if(index == 0) {
              img = $(this).attr(src);
              return cb(content, title, tags, imgs, contentBegin, img, date, ip);
            }
          });
          if($('img').length == 0) {
            return cb(content, title, tags, imgs, contentBegin, img, date, ip);
          }
        });

  }
}

exports.manageBlog = function(req, res) {
  res.render('admin/manage_blog', {isMBActive:true})
}

exports.postBlogView = function(req, res) {
  res.render('admin/post_blog');
}

exports.postBlog = function(req, res) {
  console.log('message');
}