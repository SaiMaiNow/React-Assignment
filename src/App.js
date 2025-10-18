import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Routes, Route } from 'react-router-dom';

import Navbar from './features/Navbar';
import Container from './features/Container';
import Home from './features/Home';
import AddForm from './features/Product/AddForm'
import UpdateForm from './features/Product/UpdateForm';

import GlobalStyle from './features/GlobalStyle';

let currentProductId = 9;
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const products = await axios.get(
        'https://68eb580776b3362414cd6a63.mockapi.io/products'
      );
      setProducts(products.data);
    }

    getProducts();
  }, []);

  function addProduct(product) {
    const newProduct = { id: ++currentProductId, ...product };
    setProducts([...products, newProduct]);
  }

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/create-product" element={<AddForm addProduct={addProduct} />} />
          <Route path="/" element={<Home products={products} />} />
          <Route path="/update-product/:id" element={<UpdateForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
