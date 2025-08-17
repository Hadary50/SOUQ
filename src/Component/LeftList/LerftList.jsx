import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/CartContext/UserContext/UserContext'
import { CategoryContext } from '../../Context/CartContext/CategoryContext'
import { Link, useNavigate } from 'react-router-dom'
import '../LeftList/sidebar.css' 

export default function LeftList() {
  let { userToken, setUserToken } = useContext(UserContext)
  let { getCategory } = useContext(CategoryContext)
  let navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  async function getSubCategories(product) {
    let res = await getCategory(product)
    console.log(res?.data.products)
  }

  function logout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }

  return (
    <>
     
      <button className="btn btn-btn-outline-dark m-2 w-75 " onClick={() => setIsOpen(!isOpen)}>
        ☰ Menu
      </button>

      {/* السايدبار */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to={'/category'}>
          <li className="list-group-item" onClick={() => getSubCategories('smartPhones')}>Smartphones</li>
        </Link>
        <Link to={'/category'}>
          <li className="list-group-item" onClick={() => getSubCategories('fragrances')}>Fragrances</li>
        </Link>
        <Link to={'/category'}>
          <li className="list-group-item" onClick={() => getSubCategories('furniture')}>Furniture</li>
        </Link>
        <Link to={'/category'}>
          <li className="list-group-item" onClick={() => getSubCategories('groceries')}>Groceries</li>
        </Link>
        <Link to={'/category'}>
          <li className="list-group-item" onClick={() => getSubCategories('home-decoration')}>Home decoration</li>
        </Link>
        <Link to={'/category'}>
          <li className="list-group-item" onClick={() => getSubCategories('laptops')}>Laptops</li>
        </Link>
        <Link to={'/category'}>
          <li className="list-group-item" onClick={() => getSubCategories('mens-shirts')}>Mens-shirts</li>
        </Link>
        <Link to={'/category'}>
          <li className="list-group-item" onClick={() => getSubCategories('motorcycle')}>Motorcycle</li>
        </Link>
        <Link to={'/category'}>
          <li className="list-group-item" onClick={() => getSubCategories('sunglasses')}>Sunglasses</li>
        </Link>
      </div>
    </>
  )
}
