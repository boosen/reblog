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

blogSchema.Statics = {

}

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
