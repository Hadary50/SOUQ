import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from 'react-query';
import axios from 'axios';

export default function RelatedSlider() {
  const getRelatedProducts = async () => {
    return axios.get(`https://dummyjson.com/products/category/home-decoration`);
  };

  const { data, isLoading, isError, error } = useQuery('relatedFn', getRelatedProducts);

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992, // tablet
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 576, // mobile
        settings: { slidesToShow: 2 }
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <i className="fa fa-spinner fa-spin me-2" /> Loading related items...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-danger">
        Failed to load related items: {error?.message}
      </div>
    );
  }

  const products = data?.data?.products || [];

  return (
    <div className="container py-3">
      <Slider {...settings}>
        {products.map((prod) => (
          <div key={prod.id} className="px-2">
            <div className="card h-100 border-0 shadow-sm">
              <div
                style={{
                  width: '100%',
                  paddingBottom: '100%',
                  position: 'relative',
                  background: '#f5f5f5',
                  borderRadius: 8,
                  overflow: 'hidden'
                }}
              >
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div className="card-body p-2 text-center">
                <h6 className="text-truncate mb-1">{prod.title}</h6>
                <span className="fw-bold text-danger">${prod.price}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
