import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import  'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fortawesome/fontawesome-free/css/all.min.css";
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext/CartContext';
import UserContextProvider from './Context/CartContext/UserContext/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryContextProvider from './Context/CartContext/CategoryContext';
let queryClient=new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  <UserContextProvider>
  <QueryClientProvider client={queryClient}>
    <CartContextProvider>
     <CategoryContextProvider>

    <App />
     </CategoryContextProvider>
<ToastContainer/>
    </CartContextProvider>
  </QueryClientProvider>
  </UserContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
