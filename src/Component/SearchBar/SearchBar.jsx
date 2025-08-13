// SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fetchSearch = async (q) => {
  if (!q) return { products: [] };
  const res = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`);
  return res.data;
};

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const [debounced, setDebounced] = useState('');
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);

  // debounce input (300ms)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(term.trim()), 300);
    return () => clearTimeout(id);
  }, [term]);

  // query
  const { data, isLoading } = useQuery(
    ['searchProducts', debounced],
    () => fetchSearch(debounced),
    {
      enabled: debounced.length >= 1,
      keepPreviousData: true,
      staleTime: 1000 * 30,
    }
  );

  // close dropdown on outside click
  useEffect(() => {
    const handle = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const results = data?.products || [];

  return (
    <div className="position-relative" ref={wrapperRef} style={{ minWidth: 250 }}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          aria-label="Search"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (results.length) setOpen(true);
          }}
        />
        <button className="btn btn-outline-secondary" type="button" aria-label="Search button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {open && term && (
        <div
          className="shadow bg-white position-absolute w-100 mt-1"
          style={{ zIndex: 10, maxHeight: 300, overflowY: 'auto', borderRadius: 6 }}
        >
          {isLoading && (
            <div className="p-2 text-center">
              <i className="fa fa-spinner fa-spin me-2" /> Searching...
            </div>
          )}
          {!isLoading && results.length === 0 && (
            <div className="p-2 text-muted">No results for "{term}"</div>
          )}
          {!isLoading &&
            results.slice(0, 6).map((prod) => (
              <Link
                key={prod.id}
                to={`/productDetails/${prod.id}`}
                className="d-flex align-items-center text-decoration-none text-dark px-2 py-2 hover-bg-light"
                onClick={() => setOpen(false)}
              >
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                  className="me-2"
                />
                <div className="flex-grow-1">
                  <div className="small fw-semibold text-truncate">{prod.title}</div>
                  <div className="text-danger small">$ {prod.price}</div>
                </div>
              </Link>
            ))}
          {!isLoading && results.length > 6 && (
            <div className="p-2 text-center">
              <Link to={`/search?query=${encodeURIComponent(term)}`} onClick={() => setOpen(false)}>
                View all results ({results.length})
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
