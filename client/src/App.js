import React from 'react'
import { BrowserRouter,Routes,Route, } from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import ShowData from './components/ShowData'

const App = () => {
  return (
    <>
        <BrowserRouter>
                <Routes>
                    <Route path='/' Component={RegistrationForm} ></Route>
                    <Route path='/showdata' Component={ShowData} ></Route>
                </Routes>
        </BrowserRouter>
    </>
  )
}

export default App