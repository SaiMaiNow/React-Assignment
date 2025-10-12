import React, { useState } from 'react';
import axios from 'axios';

// import data from '../app/data';
import Product from './Product';
import AddForm from './Product/AddForm';

let currentProductId = 9;

export default function Home() {
  const [products, setProducts] = useState([]);

  function addProduct(product) {
    const newProduct = { id: ++currentProductId, ...product };
    setProducts([...products, newProduct]);
  }

  async function getProducts() {
    const products = await axios.get(
      'https://apimocha.com/react-redux-class/products'
    );
    setProducts(products.data);
  }

  getProducts();

  return (
    <>
      <h1>New Products</h1>
      <ul className="Home__products">
        {
          products.length > 0 ? (
            <ul className="Home__products">
              {products.map((product) => (
                <Product key={product.id} item={product} />
              ))}
            </ul>
          ) : (
            <div>Loading products....</div>
          )
        }
      </ul>
      <AddForm addProduct={addProduct} />
    </>
  );
}
