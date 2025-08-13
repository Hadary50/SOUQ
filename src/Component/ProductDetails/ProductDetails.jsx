import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RelatedSlider from '../RelatedSlider/RelatedSlider';
import { CartContext } from '../../Context/CartContext/CartContext';
import { UserContext } from '../../Context/CartContext/UserContext/UserContext';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const { id } = useParams();
  const { AddCart } = useContext(CartContext);
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const addToCart = async (productId) => {
    if (!userToken) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }
    try {
      const response = await AddCart(productId);
      if (response?.statusText === 'Created') {
        toast.success('Product added successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (err) {
      toast.error('Error adding product to cart');
    }
  };

  const getProductDetails = (id) => {
    return axios.get(`https://dummyjson.com/products/${id}`);
  };

  const { data, isLoading, isError, error } = useQuery(
    ['prodDetails', id],
    () => getProductDetails(id),
    { enabled: !!id }
  );

  const mainSliderSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <i className="fa fa-spinner fa-spin me-2" /> Loading product details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-5 text-danger">
        Failed to load product: {error?.message}
      </div>
    );
  }

  const product = data?.data;

  return (
    <>
      <div className="container mt-3">
        <div className="row gy-4 align-items-start">
          {/* صور مصغرة */}
          <div className="col-12 col-md-2 smallImgs">
            {product?.images.map((img, idx) => (
              <div key={idx} className="shadow-sm mb-2 cursor-pointer" style={{ borderRadius: 8, overflow: 'hidden' }}>
                <img src={img} alt={product.title} className="w-100" style={{ objectFit: 'cover', height: 80 }} />
              </div>
            ))}
          </div>

          {/* السلايدر الرئيسي */}
          <div className="col-12 col-md-4">
            <Slider {...mainSliderSettings}>
              {product?.images.map((img, idx) => (
                <div key={idx} className="position-relative">
                  <div style={{ width: '100%', height: 350, overflow: 'hidden', borderRadius: 8 }}>
                    <img src={img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f5f5f5' }} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* تفاصيل المنتج */}
          <div className="col-12 col-md-5">
            <h3 className="mt-4">{product?.title}</h3>
            <div className="rat d-flex align-items-center justify-content-between mb-2">
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                <i className="fa-solid fa-star rating-color"></i>
                <i className="fa-solid fa-star rating-color"></i>
                <i className="fa-solid fa-star-half-stroke rating-color me-2"></i>
              </div>
              <span>({product?.reviews?.length || 0} Reviews)</span>
              <span className="text-success">{product?.availabilityStatus}</span>
            </div>
            <h3 className="text-danger">$ {product?.price}</h3>
            <p>{product?.description}</p>
            <hr />
            <h5>Brand: {product?.brand}</h5>

            {/* الكمية والشراء */}
            <div className="buyDiv d-flex flex-wrap align-items-center gap-2 mt-3">
              <div className="countDetails fs-5 d-flex align-items-center border rounded px-2">
                <button className="btn btn-sm" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <span className="mx-3">{quantity}</span>
                <button className="btn btn-sm" onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
              <button className="btn btn-danger" onClick={() => addToCart(id)}>Buy Now</button>
              <button className="btn btn-outline-secondary">
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>

            {/* الشحن */}
            <div className="mt-5 d-flex align-items-center">
              <i className="fs-1 fa-solid fa-truck-fast"></i>
              <div className="ms-3">
                <h5>Free Delivery</h5>
                <p className="mb-0">Enter your postal code for delivery availability</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* المنتجات المشابهة */}
      <div className="container mt-5">
        <h2 className="text-danger mb-3">Related Items</h2>
        <RelatedSlider />
      </div>
    </>
  );
}
