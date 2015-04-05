var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    content: String,
    content_begin: String,
    tags: [String],
    title: String,
    date: {type: Date, default: Date.now},
    time: {
      year: String,
      month: String,
      day: String,
      minute: String
    },
    imgs: [String],
    img: {
      original: String,
      px200: String,
      px600: String,
      px1366: String
    },
    is_top: {
      type: Boolean,
      "default": false
    },
    pv: {
      type: Number,
      "default": 0
    },
    edit_date: [
      {
        date: Date,
        ip: String
      }
    ]
});

blogSchema.statics = {
  perPageBlogIndex: function(perPage, cb){
    var blogThis = this;
    return this.count().exec(function(err, count){
      if(err) {
        return cb(err, null, 0);
      } else {
        return blogThis.find({})
          .sort({date: -1})
          .limit(perPage)
          .exec(function(err, blogs) {
            if (err) {
              return cb(err, null, 0);
            } else {
              return cb(null, blogs, count);
            }
          });
      }
    });
  },
  perPageBlogs: function(perPage, page, cb) {
    var blogThis = this;
    return this.count().exec(function(err, count) {
      if (err) {
        return cb(err, null, 0);
      } else {
        return blogThis.find({})
          .sort({date: -1})
          .skip((page-1)*perPage)
          .limit(perPage)
          .exec(function(err, blogs) {
            if (err) {
              return cb(err, null, 0);
            } else {
              return cb(null, blogs, count);
            }
          });
      }
    });
  },
  blogById: function(id, cb) {
    return this.findById(id).exec(function(err, blog) {
      if (err) {
        return cb(err, null);
      } else {
        return cb(null, blog);
      }
    });
  }
};

var Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
