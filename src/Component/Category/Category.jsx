import React, { useContext } from 'react';
import { CategoryContext } from '../../Context/CartContext/CategoryContext';

export default function Category() {
  const { subCat } = useContext(CategoryContext);
  const products = subCat?.data?.products || [];

  if (!subCat) {
    return (
      <div className="text-center py-5">
        <i className="fa fa-spinner fa-spin me-2" /> Loading category...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="mb-0">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 p-3">
      <div className="row g-4">
        {products.map((prod) => (
          <div key={prod.id} className="col-12 col-sm-6 col-md-4">
            <div className="card h-100 shadow-sm border-0 pointer card-prods">
              {/* صورة مع aspect ratio ثابت عشان ماتتحرفش */}
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '75%', // نسبه (4:3 تقريبا) تقدر تعدّل لـ 100% للمربع أو 56.25% لـ 16:9
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
                    objectFit: 'cover', // يملأ بدون تشويه مع قص بسيط لو لازم
                  }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title text-danger mb-2 text-truncate"
                  title={prod.title}
                >
                  {prod.title}
                </h5>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-danger">$ {prod.price}</span>
                  {/* ممكن تضيف rating أو زر هنا بعدين */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
