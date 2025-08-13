import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

export default function HeadSlider() {
  const fetchImages = async () => {
    const res = await axios.get(`https://dummyjson.com/products/category/furniture`);
    const products = res.data.products || [];
    if (products.length === 0) return [];
    return products[3]?.images || [];
  };

  const {
    data: images = [],
    isLoading,
    isError,
    error,
  } = useQuery('headSliderImages', fetchImages, {
    staleTime: 1000 * 60 * 5,
  });

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="position-relative mb-4">
      {isLoading && (
        <div className="text-center py-5">
          <i className="fa fa-spinner fa-spin me-2" /> Loading slider...
        </div>
      )}
      {isError && (
        <div className="text-center py-5 text-danger">
          فشل تحميل الصور: {error.message}
        </div>
      )}
      {!isLoading && images.length > 0 && (
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx} className="d-flex justify-content-center">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxHeight: 400,
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  className="w-100"
                  style={{
                    maxHeight: 400,
                    objectFit: 'contain',
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </Slider>
      )}

      <Link to="/ShopNow">
        <button
          className="btn btn-danger position-absolute"
          style={{
            bottom: 20,
            right: 20,
            padding: "0.75rem 1.25rem",
            borderRadius: 50,
            fontWeight: '600',
          }}
          aria-label="Shop Now"
        >
          Shop Now ↦
        </button>
      </Link>
    </div>
  );
}
