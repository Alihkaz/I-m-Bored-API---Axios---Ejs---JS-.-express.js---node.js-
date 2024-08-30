// 

import express from "express"; //exprees npm package
import bodyParser from "body-parser"; //body parser middleware 
import axios from "axios"; //installing axios npm package so we can make an api req from server to server in a simple way

const app = express(); //creating a blue print fromk the express package 
const port = 3000; //specifying the port that we will work on ! 



app.use(express.static("public")); //specifying the static folder path 
app.use(bodyParser.urlencoded({ extended: true })); //parsing the request sended by the user 


// home page !
app.get("/", async (req, res) => {

  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random"); //trying to send an api req , then waiting the res to send the data to the rendered ejs file
    const result = response.data; //parsing the data from the response 
    res.render("index.ejs", { data: result }); //rendering the index file
     } 

  catch (error) 
     { //catching the error then sending it back to the user in the index.ejs file  
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {error: error.message,});
     }
});



// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// submiting a customized random activity !
app.post("/", async (req, res) => {

  const type= req.body.type;
  const participants= req.body.participants;

  try {
    //trying to send an api req with parameters , then waiting the res to send the data to the rendered ejs file
    const response = await axios.get("https://bored-api.appbrewery.com/filter?type="+type+"&participants="+participants); 
    const result = response.data; //parsing the data from the response 
    let x = Math.floor((Math.random() * (result.length)) + 1); //to get random activity from the res array 
    const randomActivity=result[x];
    res.render("index.ejs", { data: randomActivity }); //rendering the index file
     } 

  // if there is no result for his request , we respomnse with an error message ! 
  catch (error) 
     { //catching the error then sending it back to the user in the index.ejs file  
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {error: "No activities that match your criteria.",});
     }

});




//listening on the local port:3000
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


