/* Global Variables */

// select the button of id "generate"
const generateButton = document.querySelector("button#generate"),
  // baseURL = the part of url which will not been changed
  baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=",
  // My personal apikey
  apiKey = "&appid=5d0fb9b6a0e7eb35076206d417b6d64f&units=imperial";
//Get the date
let d = new Date(),
  // get the date in USA Format [month.day.year]
  newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

/* Define getAllWeatherData function */
// It is asyncronous fuction
// It gets data from Open weather api using GET Route
const getAllWeatherData = async (baseURL, zipCode, apiKey) => {
  // result =  the api response when using fetch function
  // we used await here because fetching data takes some time
  const result = await fetch(baseURL + zipCode + apiKey);
  // start try block
  try {
    // allWeatherData = the result of transformation response data into json object
    // we used await here because transform data take some time
    const allWeatherData = await result.json();
    // we return "allWeatherData" to pass in then keyword
    return allWeatherData;
    // start catch and takes any error occurs
  } catch (error) {
    // show the error in the console
    console.log(`The Error is: ${error}`);
  }
};

/* Define postDataToServer function */
// It is asyncronous fuction
// It send data to the server to update projectData using POST Route
const postDataToServer = async (url, data) => {
  // destructuring properties from the data object
  const { date, temp, content } = data;
  // result =  the server response when using fetch function
  // we used await here because send req to server and receive the response take some time
  const result = await fetch(url, {
    // set method to => POST
    method: "POST",
    // set credentials to => same-origin
    credentials: "same-origin",
    // set headers
    headers: {
      // set Content-Type to => application/json
      "Content-Type": "application/json",
    },
    // here we put the data to send to the server
    // the data will be in request.body
    // this method transform data to string format
    body: JSON.stringify({
      // our data in key:value but both are the same
      date,
      temp,
      content,
    }),
  });
  // start try block
  try {
    // mostRecentData = the result of transformation response data into json object
    // we used await here because transform data take some time
    const mostRecentData = await result.json();
    // we return mostRecentData 
    return mostRecentData;
    // start catch block which takes any error occurs
  } catch (error) {
    // show the error in the console
    console.log(`The Error is: ${error}`);
  }
};

/* Define updateUIDynamically function */
// It is asyncronous fuction
// It get data from the server to update elements using GET Route
const updateUIDynamically = async () => {
  // result = the response data of the route matched with the /alldata
  // here the route is GET by default in fetch method
  // we used await here because fetching response data take some time
  const result = await fetch("/alldata");
  // start try block
  try {
    // ourFinalData = the data after transformation it into json object
    // we used await here because transform data take some time
    const ourFinalData = await result.json();
    // set date value in elemin with id "date"
    document.getElementById("date").innerHTML = ourFinalData.date;
    // set temp valuein elemin with id "temp"
    document.querySelector("#temp").innerHTML = ourFinalData.temp;
    // set content value in elemin with id "content"
    document.querySelector("#content").innerHTML = ourFinalData.content;
    // start catch block  which takes any error occurs 
  } catch (error) {
    // show error in console
    console.log(`The Error is: ${error}`);
  }
};


/* Define generateData Function */
// This function takes the event as an argument [here is "click" event]
const generateData = (e) => {
  // prevent default behavior of the event
  e.preventDefault();
  // get zip code
  const zipCode = document.getElementById("zip").value,
  // get content 
    content = document.getElementById("feelings").value;
    // check if the both "zipCode" and "content" are filled out 
  if (zipCode && content) {
    // run only when if return true

    // Invoke get allWeatherData to get data from api 
    getAllWeatherData(baseURL, zipCode, apiKey)
    // use the reurn value in last step as an arg in the callback of then
      .then((allWeatherData) => {
        // Invoke "postDataToServer" 
        // It takes the url and data object
        postDataToServer("/postdata", {
          // set key date to => newDate value
          date: newDate,
          // set key temp to => the value of allWeatherData.main.temp 
          temp: allWeatherData.main.temp,
          // set both key and value to content
          content,
        });
      })
    // use the reurn value in last step as an arg in the callback of then
      .then((mostRecentData) => {
        // Invoke updateUIDynamically function
        updateUIDynamically();
      });
      // Empty zip code 
    document.getElementById("zip").value = "";
    // Empty content 
    document.getElementById("feelings").value = "";
  } else {
    //  runs only when if return false
    
    // show alert with this message
    alert("You Must fill Out the two Fields!");
  }
};
// add click event listenr to the button with id of generate
generateButton.addEventListener("click", generateData);
