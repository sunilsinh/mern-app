const express = require('express');
const businessRoutes = express.Router();

let Business = require('.././model/business.model');

businessRoutes.get('/test', function(req, res){
	res.status(200).send("API is working");
	console.log("Wow....Api is working!!!!!!!!");
})

businessRoutes.post('/add',function(req,res){

	let business = new Business(req.body);
  console.log("Request body+++++++++++++++++"+req.body);
	business.save()
	   .then(business =>{
	   	res.status(200).json(
	   		{'business':'business added successfully'}
	   	);
	   }).catch(err=>{
	   	  res.status(400).send("Unable to save to database");
	   });

});

// RETURNS ALL THE USERS IN THE DATABASE
businessRoutes.get('/', function (req, res) {
    Business.find({}, function (err, businesses) {
        if(err){
      		console.log(err);
    	}
    	else {
      		res.json(businesses);
		}
    });
});
// Defined edit route
businessRoutes.get('/edit/:id',function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
businessRoutes.post('/update/:id',function (req, res) {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      res.status(404).send("data is not found");
    else {
        business.person_name = req.body.person_name;
        business.business_name = req.body.business_name;
        business.business_gst_number = req.body.business_gst_number;

        business.save().then(business => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.get('/delete/:id',function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


module.exports = businessRoutes;