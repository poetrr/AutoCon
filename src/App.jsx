

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginRegister from './Components/LoginRegister'

import './index.css'

 import CreateNewProjectForm from './Components/NewProject'
import Sidebar from './Components/HomePage/Sidebar.jsx'
 import PaintComponent from './Components/Paint'

import DashBoard from './Components/HomePage/DashBoard.jsx'
import { useState } from 'react'
import TileCalculator from './Components/TileCalculator.jsx'
import ACCalculator from './Components/ACCCalculator.jsx'
import SolarHeaterCalculator from './Components/SolarHeater.jsx'
import Navbar from './Components/HomePage/Navbar.jsx'

function App() {
  const [sidebarToggle,setSidebarToggle]=useState(false)

  return (
    <>

      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginRegister/>}></Route>
          <Route path="/Sidebar" element={<Sidebar sidebarToggle={sidebarToggle}/>}></Route>
          <Route path="/Dashboard" element={<DashBoard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>}/>
          <Route path="/Navbar" element={<Navbar />}></Route>
          <Route path="/Tile" element={<TileCalculator/>}></Route>
          <Route path="/ac" element={<ACCalculator/>}></Route>
          <Route path="/solar" element={<SolarHeaterCalculator/>}></Route>
          <Route path="/newProject" element={<CreateNewProjectForm/>}></Route>
          <Route path="/paint" element={<PaintComponent/>}></Route> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

