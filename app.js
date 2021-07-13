const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));







app.get("/",function(req,res){
    
    res.sendFile(__dirname + "/index.html");

})


app.post("/temperature",function(req,res){

    const cityname=req.body.cityname;
  
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=6d43b0c663f0dd7c80aa85c7d753f741&units=metric";


    https.get(url,function(response){
        console.log(response.statusCode);


        if(response.statusCode==200)
        {
   
        response.on("data",function(data){
   
           const jsondata=JSON.parse(data);
           console.log(jsondata);
           
          const icon= "http://openweathermap.org/img/wn/" + jsondata.weather[0].icon + "@2x.png";
           const temp=jsondata.main.temp;

           const description=jsondata.weather[0].description;

           const pressure=jsondata.main.pressure;

           const humidity=jsondata.main.humidity;

           res.write("<h1>Temperature  :" + temp + "  Celsius</h1>");
           res.write("<h1>Pressure   :" + pressure + "  hPa</h1>")
           res.write("<h1>Humidity  :"+ humidity +"  %  </h1>")
           res.write("<h1>Weather Description    :" +  description + "</h1>");
          
           res.write("<img src=" + icon + ">");
        
           res.send();
           console.log(temp,description,icon,pressure,humidity);
           
   
           
        })
    }
    else
    {
        const url1="https://httpstatusdogs.com/img/404.jpg";
        res.write("<h1>Ohh Ohh ......</h1>");
        res.write("<h1>City Not Found ..Please check spelling</h1>");
        res.write("<img src="+ url1 +">");
        res.send();
    }
    })

})







app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at port 3000");


});