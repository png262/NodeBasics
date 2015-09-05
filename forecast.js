
var https = require("https");
var zipcode = process.argv[2];

var latlongreq = https.get('https://maps.googleapis.com/maps/api/geocode/json?address='+zipcode+'&key=AIzaSyASFrmdDQg1t-Tvie2il_KXeGGCMA2qako',function(response) {
	var latlongdata = "";

	response.setEncoding('utf8');
	response.on('data',function(chunk) {
		latlongdata += chunk;
	});

	response.on('end',function() {
		if(response.statusCode === 200) {
			var latlongdataObj = JSON.parse(latlongdata);
			var lat = latlongdataObj.results[0].geometry.location.lat;
			var lng = latlongdataObj.results[0].geometry.location.lng;
			var add = latlongdataObj.results[0].formatted_address;
			var weatherreq = https.get('https://api.forecast.io/forecast/57ccc2a6c585c02ced14486295defe6b/'+lat+','+lng, function(response) {
				var weatherdata = "";
				response.setEncoding('utf8');

				response.on('data',function(chunk) {
					weatherdata += chunk;
				});

				response.on('end', function() {
					if(response.statusCode ===200) {
						var weatherdataObj = JSON.parse(weatherdata);
						var weather = weatherdataObj.hourly.summary;
						console.log("Weather for "+add+":")
						console.log(weather);
					}

				})
				response.on('error',function() {
					console.log("error retrieving weather");
				});
			}) 
		}
	});
	
	response.on('error',function() {
		console.log("error retrieving zip code");
	});
})



