// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Dependencies
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));


// Callback function to complete POST '/postdata'
// takes the path of route and callback funvtion
// callback takes request,response
app.post("/postdata", (request, response) => {
  // create/update key date wit value of date in request.body
  projectData.date = request.body.date;
  // create/update key temp wit value of temp in request.body
  projectData.temp = request.body.temp;
  // create/update key content wit value of content in request.body
  projectData.content = request.body.content;
  // set the status of the response to 200 
  // and send projectData in it
  response.status(200).send(projectData);
});

// Callback function to complete GET '/alldata'
// takes the path of route and callback funvtion
// callback takes request,response
app.get("/alldata", (request, response) => {
// set the status of response to 200
// and send projectData in it
  response.status(200).send(projectData);
});
/* Define listeningFunction */
// it the callback function of app.listen()
const listeningFunction = () => {
  // show a message in the console when server run
  console.log(`Server is running on port: ${port}`);
};
// set the port number
const port = 5000;
// app.listen run the server on the port passed as the first arg 
// and invoke the second arg [callback function]
app.listen(port, listeningFunction);

