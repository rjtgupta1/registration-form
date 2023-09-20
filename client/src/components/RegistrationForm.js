import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryIsoCode, setCountryIsoCode] = useState("");
  const [stateIsoCode, setStateIsoCode] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      state: "",
      city: "",
      gender: "",
      dob: "",
      age: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      axios({
        method:"post",
        url:"http://localhost:4000/data",
        data:{...values}
      })
      .then((response)=>{
        alert(response.data.message);
      })
    },
  });

  useEffect(() => {
    axios.get("http://localhost:4000/data").then((response) => {
      setCountries(response.data.countries);
    });
  }, []);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:4000/countryIsoCode",
      data: { countryIsoCode },
    }).then((res) => {
      // console.log(res);
      const states = res.data.states;
      setStates(states);
    });
  }, [countryIsoCode]);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:4000/stateIsoCode",
      data: { stateIsoCode },
    }).then((res) => {
      // console.log(res);
      const cities = res.data.cities;
      setCities(cities);
    });
  }, [stateIsoCode]);

  function calculateAge() {
    let DOB = document.getElementById("dob").value;
    let setAge = document.getElementById("age");
    let dateParts = DOB.split("-");
    let birthYear = dateParts[0];
    let currentYear = new Date().getFullYear();
    let Age = currentYear - birthYear;
    setAge.value = Age;
    formik.setFieldValue("age", Age);
  }

  function getCountryIso() {
    const selectCountry = document.getElementById("country");
    const countryCode = selectCountry.value;
    // console.log(countryCode);
    setCountryIsoCode(countryCode);

    // setting country name to formik values
    const countryName = selectCountry.options[selectCountry.selectedIndex].id;
    // console.log(countryName);
    formik.setFieldValue("country", countryName);
  }

  function getStateIso() {
    const selectState = document.getElementById("state");
    const stateCode = selectState.value;
    // console.log(stateCode);
    setStateIsoCode(stateCode);

    // setting country name to formik values
    const stateName = selectState.options[selectState.selectedIndex].id;
    // console.log(stateName);
    formik.setFieldValue("state", stateName);
  }

  function setCityName(){
    const cityName = document.getElementById("city").value;
    formik.setFieldValue("city",cityName);
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} name="Registration" id="my-form">
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          placeholder="Input First Name"
          required
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <br />
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          placeholder="Input Last Name"
          required
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Input your Email"
          required
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <br />
        <label htmlFor="country">Country: </label>
        <select name="country" id="country" onInput={ getCountryIso }>
          <option className="country" required>
            Select Country
          </option>
          {countries.map((country) => (
            <option
              id={country.name}
              key={country.name}
              name={country.name}
              value={country.isoCode}
              onChange={formik.handleChange}
            >
              {country.name}
            </option>
          ))}
        </select>
        <br />
        <label>State: </label>
        <select name="state" id="state" onInput={getStateIso}>
          <option className="country"> Select State </option>
          {states.map((state) => (
            <option
              id={state.name}
              key={state.latitude}
              name={state.name}
              value={state.isoCode}
              onChange={formik.handleChange}
            >
              {state.name}
            </option>
          ))}
        </select>
        <br />
        <label>City: </label>
        <select name="city" id="city" onInput={setCityName}>
          <option className="country"> Select City </option>
          {cities.map((city) => (
            <option
              id={city.name}
              key={city.longitude}
              name={city.isoCode}
              value={city.name}
              onChange={formik.handleChange}
            >
              {city.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="gender">Gender: </label>
        <input
          onChange={formik.handleChange}
          value="male"
          type="radio"
          id="male"
          name="gender"
          required
        />
        <span>Male: </span>
        <input
          onChange={formik.handleChange}
          value="female"
          type="radio"
          id="female"
          name="gender"
          required
        />
        <span>Female: </span>
        <br />
        <label>Date of Birth: </label>
        <input
          onChange={formik.handleChange}
          value={formik.values.dob}
          type="date"
          id="dob"
          onInput={calculateAge}
        />
        <br />
        <label htmlFor="age">Age: </label>
        <input
          onChange={formik.handleChange}
          type="number"
          name="age"
          min="14"
          id="age"
          required
        />
        <br />
        <br />
        <button className="btn" type="submit">
          Save
        </button>
        <Link to={'/showdata'} className="linkBtn" style={{textDecoration:"none"}} >Show Data</Link>
      </form>
    </>
  );
};

export default RegistrationForm;
