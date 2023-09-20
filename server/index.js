const express = require("express");
const cors = require("cors");
const countryStateCity = require("country-state-city");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const form  = require("./model/model.js");

const DB_USER = "imrjtgupta";
const DB_PASS = "FKq4WwseLuFgyWp0";
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.o7uskrl.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

var countryIsoCode;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/data", (req, res) => {
  const countries = countryStateCity.Country.getAllCountries();
  // console.log(countries);
  res.status(200).json({ countries });
});

app.get("/showdata", async (req,res) => {
  const data = await form.find({});
  // console.log(data);
  res.status(200).json({data});
})

app.post("/data", async (req, res) => {
  const data = await req.body;
  // console.log(data);
  if (data) {

    const formData = form({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        country:data.country,
        state:data.state,
        city:data.city,
        gender:data.gender,
        dob:data.dob,
        age:data.age
    })
    formData.save();

    res.status(200).json({ message: "Form submitted successfully" });
  }
});

app.post("/countryIsoCode", async (req, res) => {
  const request = await req;
  if (request.body.countryIsoCode) {
    // console.log(request.body.countryIsoCode);
    countryIsoCode = request.body.countryIsoCode;
    const states = countryStateCity.State.getStatesOfCountry(
      request.body.countryIsoCode
    );
    // console.log(states);
    res.status(200).json({ states });
  }
});

app.post("/stateIsoCode", async (req, res) => {
  const request = await req;
  if (request.body.stateIsoCode) {
    // console.log(request.body.stateIsoCode);
    const stateIsoCode = request.body.stateIsoCode;
    const cities = countryStateCity.City.getCitiesOfState(
      countryIsoCode,
      stateIsoCode
    );
    // console.log(cities);
    res.status(200).json({ cities });
  }
});

try {
  mongoose.connect(DB_URI);
  app.listen(4000, () => {
    console.log(`Server is running on 4000`);
  });
} catch (error) {
  console.log(error);
}
