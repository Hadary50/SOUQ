import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import LerftList from '../LeftList/LerftList'
export default function Layout() {
  
  return<>
  <Navbar></Navbar>
  <Outlet></Outlet>
  <Footer></Footer>
  </>
}
