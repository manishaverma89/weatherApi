const express = require("express");
const https = require("https");     //Native Node https Module Tp Perform a get request
const app = express();


app.get("/" , function(req,res){

   const url = "https://api.openweathermap.org/data/2.5/weather?&appid=2fd7f8813620b5e1839ebe6705007416&units=metric&q=yamunanagar"; 

   https.get(url , function(response){
       console.log(response);
   });

   res.send("Server is up and running.");
});




app.listen(3000 , function(){
console.log("Server is running at port 3000.");
});