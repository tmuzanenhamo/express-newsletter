const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const app = express(); // init the application

// Extract env variables from the .env file
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const API_ID = process.env.API_ID;

app.use(express.static("public")); // add static files
app.use(bodyParser.urlencoded({ extended: true })); // add body parser for request body

// define a get at the home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

// define a post at the home route
app.post("/", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: fname,
            LNAME: lname
        }
      },
    ],
  };
  jsondata = JSON.stringify(data);
  const options = {
    url: `https://us7.api.mailchimp.com/3.0/lists/${API_ID}`,
    method: "POST",
    headers: {
      Authorization: `tawanda ${API_KEY}`,
    },
    body: jsondata,
  };
  request(options, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
});

app.listen(PORT || 3000, () => {
  console.log(`Listening on ${PORT}`);
});
