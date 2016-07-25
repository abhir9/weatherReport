"use strict";
var express = require("express");
var router = express.Router();
var request =require('request');
router.get("/",function(req, res) 
{
        res.render('weather');
});

router.post("/",function(req, res, next) {
			var tempresponse='';
			console.log(JSON.stringify(req.body));
			var city = req.body.citytext.split(",");
			if(city.length>=1)
			{
				for(var i=0; i<city.length;i++)
				{
	        request({
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city[i]+',IN&cnt=14&appid=9141d449cd7f0584409c62f39e36b4d2' ,
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


				}
			   
   				     setTimeout(function(){ 
        res.end(); 
   }, 2000);
			}

    });


module.exports = router;
