import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Component/Navbar/Navbar'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart'
import Category from './Component/Category/Category'
import LeftList from './Component/LeftList/LerftList'
import Login from './Component/Login/Login'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import Register from './Component/Register/Register'
import Products from './Component/Products/Products'
import Recipe from './Component/Recipe/Recipe'
import About from './Component/About/About'
import Vision from './Component/Vision/Vision'
import WishList from './Component/WishList/WishList'
import Footer from './Component/Footer/Footer'
import Contact from './Component/Contact/Contact'
import Notfound from './Component/Notfound/Notfound'
import HeadSLider from './Component/HeadSlider/HeadSLider'
import ShopNow from './Component/ShopNow/ShopNow'
import CartContextProvider from './Context/CartContext/CartContext'
import { UserContext } from './Context/CartContext/UserContext/UserContext'
let router =createHashRouter([
  {path:'/',element:<Layout></Layout>,children:[
    {index:true,element:<Home></Home>},
    {path:'Navbar',element:<Navbar></Navbar>},
    {path:'About',element:<About></About>},
    {path:'Cart',element:<Cart></Cart>},
    {path:'Category',element:<Category></Category>},
    {path:'Login',element:<Login></Login>},
    {path:'Register',element:<Register></Register>},
    {path:'Recipe',element:<Recipe></Recipe>},
    {path:'Vision',element:<Vision></Vision>},
    {path:'WishList',element:<WishList></WishList>},
    {path:'Products',element:<Products></Products>},
    {path:`productDetails/:id`,element:<ProductDetails></ProductDetails>},
    {path:'LeftList',element:<LeftList></LeftList>},
    {path:'Contact',element:<Contact></Contact>},
    {path:'ShopNow',element:<ShopNow></ShopNow>},

    {path:'HeadSlider',element:<HeadSLider></HeadSLider>},

    {path:'Footer',element:<Footer></Footer>},
    {path:'*',element:<Notfound></Notfound>},
  ]}
])
export default function App() {
  let {setUserToken}=useContext(UserContext)
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
    setUserToken(localStorage.getItem('userToken'))

    }
  },[])

  return<>
  <RouterProvider router={router}>
  </RouterProvider>
 
  </>
}
