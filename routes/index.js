"use strict";
var express = require("express");
var router = express.Router();
var request = require('request');
router.get("/weather", function(req, res) {
	res.render('weather');
});
router.post("/weatherByCity", function(req, res, next) {
	var tempresponse = '';
	var city = req.body.citytext.split(",");
	if (city[0].length > 1) {
		if (city.length >= 1) {
			for (var i = 0; i < city.length; i++) {
				request({
					url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city[i] + ',IN&cnt=14&appid=9141d449cd7f0584409c62f39e36b4d2',
					method: 'GET'
				}, function(error, response, body) {
					if (error) {
						response = {
							"error": true,
							"message": "Error fetching data"
						};

					} else {
						if (JSON.stringify(body) === '[]') {
							response = {
								"error": true,
								"message": "Error fetching data"
							};

						} else {
							response = {
								"error": false,
								"message": body
							};

						}
					}
					res.write(JSON.stringify(response));
					res.write('\n\n');
				});


			}

			setTimeout(function() {
				res.end();
			}, 2000);
		}
	} else {
		res.render('weather');
	}


});

router.post("/weatherByGeo", function(req, res, next) {
	var tempresponse = '';
	var coord = req.body.lonlat.split(",");
	request({
		url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + coord[0] + '&lon=' + coord[1] + '&cnt=14&appid=9141d449cd7f0584409c62f39e36b4d2',
		method: 'GET'
	}, function(error, response, body) {
		if (error) {
			response = {
				"error": true,
				"message": "Error fetching data"
			};

		} else {
			if (JSON.stringify(body) === '[]') {
				response = {
					"error": true,
					"message": "Error fetching data"
				};

			} else {
				response = {
					"error": false,
					"message": body
				};

			}
		}
		res.write(JSON.stringify(response));
	});


});
router.post("/weatherById", function(req, res, next) {
	var tempresponse = '';
	request({
		url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id='+req.body.geoid+'&cnt=14&appid=9141d449cd7f0584409c62f39e36b4d2',
		method: 'GET'
	}, function(error, response, body) {
		if (error) {
			response = {
				"error": true,
				"message": "Error fetching data"
			};

		} else {
			if (JSON.stringify(body) === '[]') {
				response = {
					"error": true,
					"message": "Error fetching data"
				};

			} else {
				response = {
					"error": false,
					"message": body
				};

			}
		}
		res.write(JSON.stringify(response));
	});


});
module.exports = router;