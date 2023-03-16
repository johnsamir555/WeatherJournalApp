# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## All Info about the project:

1- **Author** :John Samir  
2- **Licence** : MIT    
3- **Technologies**:  
 - HTML
 - CSS
 - Javascript
 - Asyncronous Javascript
 - Routes in bothe: server side and client side
 - Promises
 - async/await
 - Nodejs 
 - Expressjs

4- **References**:  
 - Udaciticy Videos and Lessons
 - developer.mozilla..org
 - w3schools.com
 - javascriptturial.net
 - javascript.info
 - programiz.com 

5- **Project Features**: 
when the end user click "generate" button:  
- It get data from api 
based on the zip code which the user entered using `Get` route.
- then it take the temp from the data in last step then update data on server by useng `POST` route and sending data including date USA Format [month.day.year] and temp (from api) and content (from element with id of feelings)
-then get the server response which contains updated data and use it to update element with id of `date` to the value of `date` and the element with id of `temp` with the value of `temp` and the element of id of `content` with the value of `content`

6- **How It Works**: 
 - Install packages/dependencies via command:
  `npm i dependencyName`
  - Run the server via command:
  `npm start`
  
7- **Installed packages**: 
  - expressjs
  - body-parser
  - cors
  - nodemon
  



