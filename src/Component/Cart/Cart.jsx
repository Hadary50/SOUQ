import React, { useContext, useState, useMemo } from 'react';
import { CartContext } from '../../Context/CartContext/CartContext';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

export default function Cart() {
  const { getLoggedCart, updateCartQuantity, removeFromCart } = useContext(CartContext);
  const [updatingId, setUpdatingId] = useState(null);

  // جلب الكارت
  const {
    data: cartResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery('displayCart', getLoggedCart, {
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  const cart = cartResponse?.data?.carts?.[0] || null;
  const products = cart?.products || [];

  // حساب الإجمالي
  const subtotal = useMemo(() => {
    return products.reduce((sum, p) => sum + (p.total || p.price * p.quantity), 0);
  }, [products]);

  // زيادة / نقص الكمية
  const changeQuantity = async (productId, delta) => {
    if (updatingId) return; // منع تكرار
    try {
      setUpdatingId(productId);
      // افتراضياً: في دالة في الـ context اسمها updateCartQuantity
      // لازم تعدلها حسب اللي عندك: مثلاً: updateCartQuantity(productId, newQty)
      const target = products.find((p) => p.id === productId);
      if (!target) return;
      const newQty = Math.max(1, target.quantity + delta);
      await updateCartQuantity?.(productId, newQty);
      await refetch();
    } catch (e) {
      toast.error('فشل تحديث الكمية');
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart?.(productId);
      toast.success('تم حذف المنتج');
      await refetch();
    } catch (e) {
      toast.error('فشل في الحذف');
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <i className="fa fa-spinner fa-spin me-2" /> جاري تحميل السلة...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-danger py-5">
        فشل تحميل السلة: {error?.message || 'حدث خطأ غير متوقع'}
      </div>
    );
  }

  if (!cart || products.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>سلة التسوق فارغة</h4>
        <p>ضيف منتجات عشان تكمل الطلب.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4">Cart</h3>
      <div className="row gy-3">
        {products.map((prod) => (
          <div key={prod.id} className="col-12">
            <div className="card p-3 shadow-sm">
              <div className="row align-items-center gx-3">
                {/* صورة واسم */}
                <div className="col-12 col-md-4 d-flex align-items-center gap-3">
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="rounded"
                    style={{ width: 80, height: 80, objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-1">{prod.title}</h6>
                    <small className="text-muted">Price: ${prod.price}</small>
                  </div>
                </div>

                {/* السعر الفردي */}
                <div className="col-6 col-md-2 mt-3 mt-md-0">
                  <div>
                    <span className="d-block fw-semibold">Unit:</span>
                    <span>${prod.price}</span>
                  </div>
                </div>

                {/* كمية */}
                <div className="col-6 col-md-3 mt-3 mt-md-0">
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => changeQuantity(prod.id, -1)}
                      disabled={updatingId === prod.id || prod.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <div className="px-2">{prod.quantity}</div>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => changeQuantity(prod.id, 1)}
                      disabled={updatingId === prod.id}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* المجموع للعنصر */}
                <div className="col-6 col-md-2 mt-3 mt-md-0">
                  <div>
                    <span className="d-block fw-semibold">Total:</span>
                    <span>${prod.total || (prod.price * prod.quantity).toFixed(2)}</span>
                  </div>
                </div>

                {/* حذف */}
                <div className="col-6 col-md-1 mt-3 mt-md-0 text-end">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemove(prod.id)}
                    aria-label="Remove item"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* الملخص */}
        <div className="col-12">
          <div className="card p-3 shadow-sm">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div>
                <h5 className="mb-2">Total </h5>
                <p className="mb-1">
                   Count: <strong>{products.length}</strong>
                </p>
              </div>
              <div className="text-md-end">
                <p className="mb-1">
                  Subtotal: <strong>${subtotal.toFixed(2)}</strong>
                </p>
                {/* ممكن تحط زر Checkout هنا */}
                <button className="btn btn-danger mt-2">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
