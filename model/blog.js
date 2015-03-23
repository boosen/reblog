var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    content: String,
    contentBegin: String,
    tags: [String],
    title: String,
    data: Date,
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
    isTop: {
      type: Boolean,
      "default": false
    },
    pv: {
      type: Number,
      "default": 0
    },
    editDate: [
      {
        date: Date,
        ip: String
      }
    ]
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
