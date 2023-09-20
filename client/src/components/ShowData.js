import React, { useState } from 'react'
import axios from 'axios'

const ShowData = () => {

    const [formData,setFormData] = useState([]);
    axios.get("http://localhost:4000/showdata")
    .then((response)=>{
        // console.log(response.data.data);
        setFormData(response.data.data);
    })

  return (
    <>
        <table>
        <thead>
            <tr className="first-row">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody id="data-output">
            {
                formData.map((data)=>(
                <tr key={data._id}>
                <td> {data.firstName} </td>
                <td> {data.lastName} </td>
                <td> {data.email} </td>
                <td> {data.country} </td>
                <td> {data.state} </td>
                <td> {data.city} </td>
                <td> {data.gender} </td>
                <td> {data.dob} </td>
                <td> {data.age} </td>
            </tr>
                ))
            }
        </tbody>
    </table>
    </>
  )
}

export default ShowData