import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react'
import axios from 'axios'

const Form = () => {

    const [countries,setCountries] = useState([]);
    const [states,setStates] = useState([]);
    const [cities,setCities] = useState([]);
    const [countryIsoCode,setCountryIsoCode] = useState('');
    const [stateIsoCode,setStateIsoCode] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:4000/data')
        .then(response=>{
        setCountries(response.data.countries);
    })
    },[])

    useEffect(()=>{
        axios({
            method:'post',
            url:'http://localhost:4000/countryIsoCode',
            data:{countryIsoCode}
        })
        .then(res=>{
            // console.log(res);
            const states = res.data.states;
            setStates(states);
        })
    },[countryIsoCode])

    useEffect(()=>{
        axios({
            method:'post',
            url:'http://localhost:4000/stateIsoCode',
            data:{stateIsoCode}
        })
        .then(res=>{
            // console.log(res);
            const cities = res.data.cities;
            setCities(cities);
        })
    },[stateIsoCode])

    function calculateAge(){
        let DOB = document.getElementById("dob").value;
        let setAge = document.getElementById("age");
        let dateParts = DOB.split("-");
        let birthYear = dateParts[0];
        let currentYear = new Date().getFullYear();
        let Age = currentYear - birthYear;
        setAge.value = Age;
    }

    function getCountryIso(){
        let countryIsoCode = document.getElementById("country").value;
        setCountryIsoCode(countryIsoCode);
    }

    function getStateIso(){
        let stateIsoCode = document.getElementById("state").value;
        // console.log(stateIsoCode);
        setStateIsoCode(stateIsoCode);
    }

  return (
    <>
    <form name="Registration" id="my-form">
        <label>First Name: </label>
        <input type="text" name="first-name" pattern="[a-zA-Z]" placeholder="Input First Name" /><br/>
        <label>Last Name: </label>
        <input type="text" name="last-name" pattern="[a-zA-Z]" placeholder="Input Last Name" /><br/>
        <label>Email:</label>
        <input type="email" name="email" placeholder="Input your Email" /><br/>
        <label>Country: </label>
        <select name="country" id="country" onChange={getCountryIso}>
            <option className="country"> Select Country </option>
            {
                countries.map((country)=>(
                    <option key={country.name} name={country.name} value={country.isoCode}> {country.name} </option>
                ))
            }
        </select><br/>
        <label>State: </label>
        <select name="state" id="state" onChange={getStateIso}>
            <option className="country"> Select State </option>
            {
                states.map((state)=>(
                    <option key={state.name} name={state.name} value={state.isoCode}> {state.name} </option>
                ))
            }
        </select><br/>
        <label>City: </label>
        <select name="city" id="city">
            <option className="country"> Select City </option>
            {
                cities.map((city)=>(
                    <option key={city.name} name={city.name} value={city.isoCode}> {city.name} </option>
                ))
            }
        </select><br/>
        <label>Gender: </label>
        <input type="radio" id="male" name="gender" required />
        <span>Male: </span>
        <input type="radio" id="female" name="gender" required />
        <span>Female: </span><br/>
        <label>Date of Birth: </label>
        <input type="date" id="dob" onInput={calculateAge} /><br/>
        <label htmlFor="age">Age: </label>
        <input type="number" name="age" min="14" id="age" required /><br/><br/>
        <button className="btn" type="submit">Save</button>
        <button className="btn" type="button">Show Data</button>
    </form>
    </>
  )
}

export default Form