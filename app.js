const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");     //Native Node https Module Tp Perform a get request
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/" , function(req,res){
   res.sendFile(__dirname + "/index.html");                                                         

});

app.post("/",function(req,res){

   // console.log(req.body.cityName);
   const query = req.body.cityName;

   const appKey = "2fd7f8813620b5e1839ebe6705007416";
   const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?&appid="+ appKey +"&units="+ unit +"&q=" + query;

   // const url = "https://api.openweathermap.org/data/2.5/weather?&appid=2fd7f8813620b5e1839ebe6705007416&units=metric&q=yamunanagar";   //before breaking the url


       https.get(url , function(response){
       console.log(response.statusCode);

       response.on("data" , function(data){
        //    console.log(data);              // we'll get some hexadecimal code
          
        const weatherData = JSON.parse(data);  // this will turn the data into actual javascript object
        //    console.log(weatherData);

    //Fetching Live Data From Open Weather Map API
           
           const weatherTemperature = weatherData.main.temp; // will get the temp which in inside main 
         //   console.log(temperature);
       
        res.write("<h1>Temperature in " +query+ " is: " + weatherTemperature + " degrees celcius " + " </h1> ");  //we can't use multiple send(),but we can use multiple res.write in combination with res.send().

           const weatherDesc = weatherData.weather[0].description;
        //    console.log(weatherDesc);
       
        res.write("<p>Description is: " + weatherDesc + "</p>");

        //  Adding Icon Image
        const iconImage = weatherData.weather[0].icon;
        const imageURL =  "http://openweathermap.org/img/wn/"+ iconImage + "@2x.png" ; //break the url with const "icon" 
        res.write("<img src = " + imageURL +">");
        // console.log(icon);
         res.send();
       });    

   });   



});




















app.listen(3000 , function(){
console.log("Server is running at port 3000.");
});