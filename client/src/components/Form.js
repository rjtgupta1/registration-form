import React from 'react'

const Form = () => {

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
        console.log(countryIsoCode);
    }

  return (
    <>
    <form name="Registration" id="my-form">
        <label>First Name: </label>
        <input type="text" name="first-name" pattern="[a-zA-Z]" oninvalid="setCustomValidity('Please enter alphabets only.')" placeholder="Input First Name" /><br/>
        <label>Last Name: </label>
        <input type="text" name="last-name" pattern="[a-zA-Z]" oninvalid="setCustomValidity('Please enter alphabets only.')" placeholder="Input Last Name" /><br/>
        <label>Email:</label>
        <input type="email" name="email" placeholder="Input your Email" /><br/>
        <label>Country: </label>
        <select name="country" id="country" onChange={getCountryIso}>
            <option className="country"> Select Country </option>
        </select><br/>
        <label>State: </label>
        <select name="state" id="state">
            <option className="country"> Select State </option>
        </select><br/>
        <label>City: </label>
        <select name="city" id="city">
            <option className="country"> Select City </option>
        </select><br/>
        <label>Gender: </label>
        <input type="radio" id="male" name="gender" required />
        <span>Male: </span>
        <input type="radio" id="female" name="gender" required />
        <span>Female: </span><br/>
        <label>Date of Birth: </label>
        <input type="date" id="dob" onInput={calculateAge} /><br/>
        <label for="age">Age: </label>
        <input type="number" name="age" min="14" id="age" required /><br/><br/>
        <button className="btn" type="submit">Save</button>
        <button className="btn" type="button">Show Data</button>
    </form>
    </>
  )
}

export default Form