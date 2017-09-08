var mongoose =require('mongoose')
 

 // Client Schema
var clientSchema = mongoose.Schema({
	name:{
		type: String,
		required: true,
		unique: true
	},
	card:{
		type: String,
		required: true,
		unique: true
	},
	email:{
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true
	},
	money:{
		type: Number,
		required: true,
		default: 0
	},
	image_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Client = module.exports = mongoose.model('Client', clientSchema);