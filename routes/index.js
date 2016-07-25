"use strict";
var express = require("express");
var router = express.Router();
var request = require('request');
var config = require('../config/config');
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
					url: config.host_string+'q=' + city[i] + ',IN&cnt='+config.count+'&'+config.appid_string,
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
		url: config.host_string+'lat=' + coord[0] + '&lon=' + coord[1] + '&cnt='+config.count+'&'+config.appid_string,
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
		url: config.host_string+'id='+req.body.geoid+'&cnt='+config.count+'&'+config.appid_string,
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