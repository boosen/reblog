var mongoose 	= require('mongoose'),
	setting		= require('../setting');

mongoose.connect('mongodb://' + setting.host + '/' + setting.db, {
	server: {
		poolSize: 3
	}
});

var conn = mongoose.connection;

conn.on('connected', function() {
	return console.log('connected mongodb');
});

exports.disconnect = function() {
	return mongoose.disconnect(function(err){
		if (err) console.log(err);
		return console.log('all connection closed');
	})
}