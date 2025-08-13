import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext/CartContext'
import { UserContext } from '../../Context/CartContext/UserContext/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Products() {
  let {AddCart}=useContext(CartContext)
let {userToken,setUserToken}=useContext(UserContext)  
let Navigate=useNavigate()
async function addToCart(productId){
  if (userToken==null){
    toast.error('Somesing Wrong ')
    Navigate('/login')
    }else{
     let response=await AddCart(productId) 
     console.log(response);
    if(response.statusText=='Created'){
      toast.success('product Added Successfully')
    }else{
      toast.error('Somesing went Wrong')
    }
 
    }
}
  async function getProducts(){
    return await axios.get(`https://dummyjson.com/products`)
  }
  let {data}=useQuery('getProducts',getProducts)
  
  return <>
  {data?<div className="container">
    <div className="row justify-content-center">
    {data?.data.products.map((prod)=><div key={prod.id} className='product col-md-3 g-2 p-2 m cursor-pointer position-relative'>
      <Link to={`/productDetails/${prod.id}`}>
<img src={prod.thumbnail} alt="" className='w-100' />
  <div className='heartIcon '>
  <i className=" fa-regular fa-heart"></i> 
  </div>
  <div className='eyeIcon'>
  <i className="  fa-regular fa-eye"></i>
  </div>
  <div className='discountItem bg-danger w-25 text-center  text-white  rounded-2'>
<h6 className='discFont'>-{prod.discountPercentage} %</h6>
  </div>

<h5 className='mt-1 fw-semibold'>{prod.title}</h5>
<div className="price d-flex justify-content-between">
<h6 className='text-danger'> $ {prod.price}</h6>
</div>
<div className='rat'>
<i className="fa-solid fa-star rating-color"></i>
<i className="fa-solid fa-star rating-color"></i>
<i className="fa-solid fa-star rating-color"></i>
<i className="fa-solid fa-star-half-stroke rating-color me-2"></i>
{prod.rating}
</div>
</Link>
<button className='btnCard ' onClick={()=>addToCart(prod.id)}>Add To Cart</button>
    </div>)}

    </div>
  </div>:<h2>Loading</h2>}
 
  </>
}
