var Blog = require('../model/blog');
var marked = require('marked');
var env = require('jsdom').env;
var mongoose = require('mongoose');
var ArticleSub = require('../articleSub');

// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   tables: true,
//   breaks: true,
//   pedantic: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false
// });

var postPre = function(req,res, cb) {
  req.assert('title', 'title should be required').notEmpty();
  req.assert('content', 'content shouldn\'t be empty').notEmpty();
  var errors = req.validationErrors();
  if(errors) {
    return res.json({
      err: errors,
      success: false
    });
  } else {
    var content = req.body.content,
        contentHtml = marked(content),
        title = req.body.title,
        tags = req.body.tags.trim().split(/\s+/g),
        imgs = [],
        img = '',
        text = ArticleSub.subArtc(contentHtml, 200).toString() + '',
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
              img = $(this).attr('src');
              return cb(content, title, tags, imgs, contentBegin, img, date, ip);
            }
          });
          if($('img').length == 0) {
            return cb(content, title, tags, imgs, contentBegin, img, date, ip);
          }
        });
  }
};

exports.manageBlog = function(req, res) {
  return Blog.find().sort({date:'desc'}).exec(function(err, blogs){
    return res.render('admin/manage_blog', {isMBActive: true, blogs: blogs});
  });
};

exports.postBlogView = function(req, res) {
  return res.render('admin/post_blog', {isPBActive: true});
};

exports.postBlog = function(req, res) {
  return postPre(req, res, function(content, title, tags, imgs, contentBegin, img, date, ip){
    var blog = new Blog({
      content: content,
      title: title,
      content_begin: contentBegin,
      tags: tags,
      img: {
        px600: img.replace('px1366', 'px600'),
        px200: img.replace('px1366', 'px200'),
        original: img.replace('px1366', ''),
        px1366: img
      },
      imgs: imgs,
      date:date,
      time: {
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
        minute: date.getHours() + ':' + date.getMinutes()
      },
      ip: ip
    });

    return blog.save(function(err){
      if(err) {
        return res.json({
          success:false,
          err:err
        });
      } else {
        return res.redirect('/admin/manage-blog')
      }
    });
  });
};

exports.deleteBlog = function(req, res) {
  var id = req.params.id;
  console.log(id);
  return Blog.remove({_id: id}).exec(function(err){
    if(err) {
      return res.json({
        success:false
      });
    } else {
      return res.json({
        success:true
      });
    }
  });
};

exports.editBlogView = function(req, res) {
  // console.log(req.params.id);
  var id = mongoose.Types.ObjectId(req.params.id);
  
  return Blog.findById(id, null, function(err, blog) {
    return res.render('admin/edit_blog', {blog:blog}); 
  });
};

exports.editBlog = function(req, res) {
  var id = req.params.id;
  return postPre(req, res, function(content, title, tags, imgs, contentBegin, img, date, ip){
    var blog = {
      content: content,
      title: title,
      content_begin: contentBegin,
      tags: tags,
      img: {
        px600: img.replace('px1366', 'px600'),
        px200: img.replace('px1366', 'px200'),
        original: img.replace('px1366', ''),
        px1366: img
      },
      imgs: imgs
    };

    return Blog.update({
        _id: id
      }, {
        $set: blog,
        $push: {
          "edit_date": {
            date: date,
            ip: ip
          }
        }
      }, function(err, num, row) {
        if (err && num === 0) {
          return res.json({
            success: false
          });
        } else {
          return res.redirect('/admin/manage-blog');
        }
      });
  });
}