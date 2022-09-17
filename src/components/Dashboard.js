import React from "react"
import NavigationBar from "./NavBar"
import {Outlet , Navigate} from "react-router-dom"
import Timeline from '../pages/Timeline'

export default function Dashboard() {
  

  return (
    
    <>

      <NavigationBar/>
      <Outlet/>

    </>
    
  )
}
