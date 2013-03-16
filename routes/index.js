//var io = require('socket.io');

exports.index = function(req, res){
  res.render('index', { });
};

exports.altitude = function(req, res){
	if(req.body.altitude){
		console.log("Received altitude data: " + req.body.altitude);
		if(req.altitude){
			console.log("Socket.io server namespace 'altitude' present.");
			req.altitude.emit('altitude', {value: req.body.altitude});
		}else{
			console.log("No socket.io server namespace 'altitude' present.");
		}		
	}else{
		console.log("No altitude data in request.");
	}
	res.json({response: "Altitude data " + req.body.altitude + " received."});
};

exports.speed = function(req, res){

};

exports.heading = function(req, res){

};

exports.raw = function(req, res){
	console.log("In /api/raw");
	console.dir(req.body);
	if(req.body.header){
		console.dir(req.body.header);
		//var Header = require('../models/header').Header(req.db);
		var header = new Object();
		header.rawData = req.body.header;

		// send on socket.io
		req.altitude.emit('altitude', {value: header.rawData.altitude});
		req.throttle_vertical.emit('throttle', {value: header.rawData.throttle.height});
		req.throttle_horizontal.emit('throttle', {value: header.rawData.throttle.forward});
		req.battery.emit('battery', {value: header.rawData.batteryMilliVolt})

/*		var h = new Header(header);
		h.markModified('rawData');
		h.save(function(err, saved_header){
			if(err){
				console.dir(err);
				res.json(err);
			}else{
				console.log("Header saved:");
				console.dir(saved_header);
				res.json({message: "Success"});
			}
		});
*/
		res.json({message: "Success"});

	}else{
		console.log("No header received.");
		res.json({message: "No header received."});
	}
}

exports.throttle = function(req, res){
	if(req.body.throttle){
		console.log("Received throttle data: " + req.body.throttle);
		if(req.throttle){
			console.log("Socket.io server namespace 'throttle' present.");
			req.throttle.emit('throttle', {value: req.body.throttle});
		}else{
			console.log("No socket.io server namespace 'throttle' present.");
		}		
	}else{
		console.log("No throttle data in request.");
	}
	res.json({response: "throttle data " + req.body.throttle + " received."});
};