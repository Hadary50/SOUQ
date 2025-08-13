import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';
import { UserContext } from '../../Context/CartContext/UserContext/UserContext';
import { toast } from 'react-toastify';

export default function ShopNow() {
  const { AddCart } = useContext(CartContext);
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [addingId, setAddingId] = useState(null);

  // جلب المنتجات (بدون setState يدوي)
  async function getProducts() {
    const res = await axios.get(
      `https://dummyjson.com/products/category/furniture`
    );
    return res.data.products;
  }

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery('shopNow', getProducts, {
    staleTime: 1000 * 60 * 3,
  });

  async function addToCart(productId) {
    if (!userToken) {
      toast.error('لازم تسجل دخول أولاً');
      navigate('/login');
      return;
    }

    if (addingId === productId) return; // منع التكرار
    try {
      setAddingId(productId);
      const response = await AddCart(productId);
      if (response?.status === 201 || response?.statusText === 'Created') {
        toast.success('تم إضافة المنتج للسلة بنجاح');
      } else {
        toast.error('حصل خطأ أثناء الإضافة');
      }
    } catch (e) {
      toast.error('خطأ في الشبكة أو الخادم');
      console.error(e);
    } finally {
      setAddingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <i className="fa fa-spinner fa-spin me-2" /> جاري تحميل المنتجات...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-5 text-danger">
        فشل تحميل المنتجات: {error.message}
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 justify-content-center">
        {products?.map((prod) => (
          <div key={prod.id} className="col">
            <div className="card h-100 shadow-sm border-0 position-relative">
              <Link
                to={`/productDetails/${prod.id}`}
                className="text-decoration-none text-body"
                aria-label={prod.title}
              >
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      paddingBottom: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      loading="lazy"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div
                    className="position-absolute top-0 start-0 bg-danger text-white rounded-end px-2 py-1"
                    style={{ fontSize: 12 }}
                  >
                    -{Math.round(prod.discountPercentage)}%
                  </div>
                  <div
                    className="position-absolute"
                    style={{ top: 8, right: 8 }}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </div>
                  <div
                    className="position-absolute"
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
                    <div className="text-danger fw-bold">$ {prod.price}</div>
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
                  className="btn btn-sm btn-primary w-100"
                  onClick={() => addToCart(prod.id)}
                  disabled={addingId === prod.id}
                >
                  {addingId === prod.id ? 'Adding...' : 'Add To Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
