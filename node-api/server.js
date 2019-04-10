const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/DB.js');
const businessRoute = require('./routes/business.route');


mongoose.Promise = global.Promise;
mongoose.connect(config.DB,{useNewUrlParser: true}).then(
	()=>{
		console.log("Database connected!");

	},
	err =>{console.log("Can't connect to Database" + err)}
	);

// To call api from another server
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Define routed with business
app.use('/business', businessRoute);

app.listen(PORT, ()=>{
	console.log(`Server is running on port, ${PORT}`)
});


