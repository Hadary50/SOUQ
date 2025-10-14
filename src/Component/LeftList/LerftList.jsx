import React, { useContext } from 'react'
import { CategoryContext } from '../../Context/CartContext/CategoryContext'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import '../LeftList/sidebar.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function LeftList() {
  const { getCategory } = useContext(CategoryContext)

  async function getSubCategories(product) {
    let res = await getCategory(product)
    console.log(res?.data.products)
  }

  const categories = [
    { name: 'Smartphones', key: 'smartphones' },
    { name: 'Fragrances', key: 'fragrances' },
    { name: 'Furniture', key: 'furniture' },
    { name: 'Groceries', key: 'groceries' },
    { name: 'H-Decoration', key: 'home-decoration' },
    { name: 'Laptops', key: 'laptops' },
    { name: 'Mens Shirts', key: 'mens-shirts' },
    { name: 'Motorcycle', key: 'motorcycle' },
    { name: 'Sunglasses', key: 'sunglasses' },
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      }
    ]
  }

  return (
    <>
      {/* سايدبار للديسكتوب فقط */}
      <div className="sidebar d-none d-xl-block">
        <ul className="list-group">
          {categories.map((cat, i) => (
            <Link key={i} to="/category" onClick={() => getSubCategories(cat.key)}>
              <li className="list-group-item">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      {/* سلايدر للموبايل والتابلت */}
      <div className="d-block d-xl-none category-slider bg-white shadow-sm py-2">
        <div className="container">
          <Slider {...settings}>
            {categories.map((cat, index) => (
              <div key={index} className="text-center">
                <Link
                  to={'/category'}
                  onClick={() => getSubCategories(cat.key)}
                  className="category-item"
                >
                  {cat.name}
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}
