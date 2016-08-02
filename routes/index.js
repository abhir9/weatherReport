"use strict";
var express = require("express");
var router = express.Router();
var request = require('request');
var config = require('../config/config');
router.get("/weather", function(req, res) {
	res.render('weather');
});
router.get("/", function(req, res) {
	res.redirect('/weather');
});

router.post("/weatherByCity", function(req, res, next) {
	var tempresponse = '';
	var city = req.body.citytext.split(",");
	var pattern=/^[^0-9\#\$\@\+]*$/;
	if (city[0].length > 1) {
							var dataobject =[];
		if (city.length >= 1) {
			for (var i = 0; i < city.length; i++) {
			if (pattern.test(city[i])) 
					{
				request({
					url: config.host_string+'q=' + city[i] + ',IN&units=metric&cnt='+config.count+'&'+config.appid_string,
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
								"message": JSON.parse(body)
							};

						}
					}
						dataobject.push(response);
				});

			}
				else
	{
		res.end(JSON.stringify( {
					"error": true,
					"message": "invalid city name"
				}
				));
	}

			}

			setTimeout(function() {
			res.render('output',{data:dataobject});
			}, 1000);
		}
	} else {
		res.render('weather');
	}


});

router.post("/weatherByGeo", function(req, res, next) {
	var tempresponse = '';
	var coord = req.body.lonlat.split(",");
	var pattern=/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/;
								var dataobject =[];
	if (pattern.test(coord[0]) & pattern.test(coord[1])) {

	request({
		url: config.host_string+'lat=' + coord[0] + '&lon=' + coord[1] + '&units=metric&cnt='+config.count+'&'+config.appid_string,
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
					"message": JSON.parse(body)
				};

			}
				dataobject.push(response);
		}
			res.render('output',{data:dataobject});
	});
	}
	else
	{
		res.end(JSON.stringify( {
					"error": true,
					"message": "invalid geo coords"
				}
				));
	}


});
router.post("/weatherById", function(req, res, next) {
	
	var pattern =/^[0-9]*$/;
	var tempresponse = '';
	var dataobject=[];
	if(pattern.test(req.body.geoid))
	{		request({
		url: config.host_string+'id='+req.body.geoid+'&units=metric&cnt='+config.count+'&'+config.appid_string,
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
					"message": JSON.parse(body)
				};

			}
				dataobject.push(response);
		}
			res.render('output',{data:dataobject});
	});
	}
	else
	{
		res.end(JSON.stringify( {
					"error": true,
					"message": "invalid location id number"
				}
				));
	}


});
module.exports = router;