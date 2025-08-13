import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';
import { UserContext } from '../../Context/CartContext/UserContext/UserContext';
import { toast } from 'react-toastify';

export default function FlashSale() {
  const { AddCart } = useContext(CartContext);
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [addingId, setAddingId] = useState(null); // لمنع الضغط المتكرر

  // جلب المنتجات
  async function getFlashSale() {
    const res = await axios.get(`https://dummyjson.com/products`);
    return res.data;
  }

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery('FlashSale', getFlashSale, {
    staleTime: 1000 * 60 * 3, // cache 3 دقائق
  });

  // إضافة للسلة
  async function addToCart(productId) {
    if (!userToken) {
      toast.error('You need to login first');
      navigate('/login');
      return;
    }

    if (addingId === productId) return; // already in progress
    try {
      setAddingId(productId);
      const response = await AddCart(productId);
      // نتأكد من الـ status code بدل statusText
      if (response?.status === 201 || response?.statusText === 'Created') {
        toast.success('Product added successfully');
      } else {
        toast.error('Something went wrong while adding');
      }
    } catch (e) {
      toast.error('Network or server error');
      console.error(e);
    } finally {
      setAddingId(null);
    }
  }

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    arrows: true,
    dots: false,
    adaptiveHeight: false,
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <h2>Flash Sale</h2>
        <div className="text-center py-5">Loading products...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mt-5">
        <h2>Flash Sale</h2>
        <div className="text-center text-danger py-5">
          Error loading products: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Flash Sale</h2>
      <div className="position-relative">
        <Slider className="sssslider" {...settings}>
          {data?.products.map((prod) => (
            <div
              key={prod.id}
              className="product px-2"
              style={{ outline: 'none' }}
            >
              <div className="card h-100 border-0 shadow-sm">
                <Link
                  to={`/productDetails/${prod.id}`}
                  className="text-decoration-none text-body"
                  aria-label={prod.title}
                >
                  <div className="position-relative">
                    <div
                      style={{
                        paddingBottom: "100%",
                        position: "relative",
                        overflow: "hidden",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    >
                      <img
                        src={prod.thumbnail}
                        alt={prod.title}
                        loading="lazy"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div
                      className="discountItem position-absolute top-0 start-0 bg-danger text-white rounded-end px-2 py-1"
                      style={{ fontSize: 12 }}
                    >
                      -{Math.round(prod.discountPercentage)}%
                    </div>
                    <div
                      className="heartIcon position-absolute"
                      style={{ top: 8, right: 8 }}
                    >
                      <i className="fa-regular fa-heart"></i>
                    </div>
                    <div
                      className="eyeIcon position-absolute"
                      style={{ top: 8, left: 8 }}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </div>
                  </div>
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1 text-truncate">
                      {prod.title}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="text-danger fw-bold">
                        $ {prod.price}
                      </div>
                      <div className="rat small d-flex align-items-center">
                        <i className="fa-solid fa-star rating-color me-1"></i>
                        <i className="fa-solid fa-star rating-color me-1"></i>
                        <i className="fa-solid fa-star rating-color me-1"></i>
                        <i className="fa-solid fa-star-half-stroke rating-color me-1"></i>
                        <span>{prod.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="card-footer bg-white border-0 p-2">
                  <button
                    className="btn btn-sm btn-outline-primary w-100"
                    onClick={() => addToCart(prod.id)}
                    disabled={addingId === prod.id}
                  >
                    {addingId === prod.id ? "Adding..." : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="text-center mt-4">
        <Link
          className="d-inline-block bg-danger px-4 py-2 text-white rounded"
          to="/products"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
