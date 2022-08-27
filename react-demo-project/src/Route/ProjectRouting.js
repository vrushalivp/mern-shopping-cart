import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import SignUp from '../auth/SignUp';
import Cart from '../containers/Cart';
import Product from '../containers/Product';
import Products from '../shared/Products';
import Home from '../shared/Home';
import CheckOutModal from '../containers/CheckOutModal';


export default function ProjectRouting() {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path='/checkout' element={<CheckOutModal />} />
    </Routes>

  )
}
