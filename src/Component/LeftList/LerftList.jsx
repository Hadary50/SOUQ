import React, { useContext } from 'react'
import { UserContext } from '../../Context/CartContext/UserContext/UserContext'
import { CategoryContext } from '../../Context/CartContext/CategoryContext'
import { Link, useNavigate } from 'react-router-dom'

export default function LerftList() {
  let {userToken,setUserToken}=useContext(UserContext)
  let {getCategory}=useContext(CategoryContext)
  let navigate=useNavigate()
 async function getSubCategories(product){
        let res=await getCategory(product)
    console.log(res?.data.products);
  }
  function logout(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }
  return <>
  <div className="list-group ">
  
  <Link to={'/category'}> <li className="dropdown-item list-group-item list-group-item-action" onClick={()=>getSubCategories('smartPhones')}>smartphones</li></Link>
  <Link to={'/category'}> <li className="dropdown-item list-group-item list-group-item-action" onClick={()=>getSubCategories('fragrances')}>fragrances</li></Link>
  <Link to={'/category'}> <li className="dropdown-item list-group-item list-group-item-action" onClick={()=>getSubCategories('furniture')}>furniture</li></Link>
  <Link to={'/category'}> <li className="dropdown-item list-group-item list-group-item-action" onClick={()=>getSubCategories('groceries')}>groceries</li></Link>
  <Link to={'/category'}> <li className="dropdown-item list-group-item list-group-item-action" onClick={()=>getSubCategories('home-decoration')}>Home docoration</li></Link>
  <Link to={'/category'}> <li className="dropdown-item list-group-item list-group-item-action" onClick={()=>getSubCategories('laptops')}>laptops</li></Link>
  <Link to={'/category'}> <li className="dropdown-item list-group-item list-group-item-action" onClick={()=>getSubCategories('mens-shirts')}>mens-shirts</li></Link>
  <Link to={'/category'}> <li className="dropdown-item list-group-item list-group-item-action" onClick={()=>getSubCategories('motorcycle')}>motorcycle</li></Link>
  <Link to={'/category'}> <li className="dropdown-item list-group-item list-group-item-action" onClick={()=>getSubCategories('sunglasses')}>sunglasses</li></Link>
</div>
  
  </>
}
