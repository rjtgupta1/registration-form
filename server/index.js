const express = require('express');
const cors = require('cors')
const countryStateCity = require('country-state-city');
const bodyParser = require('body-parser')

const app = express();

var countryIsoCode;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/data",(req,res)=>{
    const countries = countryStateCity.Country.getAllCountries();
    // console.log(countries);
    res.status(200).json({countries});
})

app.post("/countryIsoCode",async (req,res)=>{
    const request = await req;
    if(request.body.countryIsoCode){
        // console.log(request.body.countryIsoCode);
        countryIsoCode = request.body.countryIsoCode;
        const states = countryStateCity.State.getStatesOfCountry(request.body.countryIsoCode);
        // console.log(states);
        res.status(200).json({states});
    }
})

app.post("/stateIsoCode",async (req,res)=>{
    const request = await req;
    if(request.body.stateIsoCode){
        // console.log(request.body.stateIsoCode);
        const stateIsoCode = request.body.stateIsoCode;
        const cities = countryStateCity.City.getCitiesOfState(countryIsoCode,stateIsoCode);
        // console.log(cities);
        res.status(200).json({cities});
    }
})

app.listen(4000,()=>{
    console.log('App is listening on PORT 4000');
})