import React from 'react';
import PropTypes from 'prop-types';
//prop-types เป็นการตรวจสอบประเภทของ props ที่ส่งเข้ามา

function Product({ item }) {
  let productImage = '';//ป้องกัน er เถ้าไม่มีภาพ

  if (item.imageURL) {//ถ้ามีค่ารันต่อ
    if (item.imageURL.startsWith('http') || item.imageURL.startsWith('https')) { //
      productImage = item.imageURL; // ใช้ URL ภายนอกตรงๆ 
      //https://placehold.co/200x200/cccccc/ffffff/png
    } else {
      try {
        productImage = require(`../../assets/${item.imageURL}`);
        //watch.jpg
      } catch (err) {
        console.warn(`Image not found: ${item.imageURL}`, err);
        productImage = require('../../assets/default.jpg');
      }
    }
  } else {
    console.log(`item.imageURL is missing or falsy (value: ${item.imageURL}), using default placeholder.`);
        productImage = require('../../assets/default2.jpg');

  }
  return (
    <li className="Products">
      <a href={`/update-product/${item.id}`}>
        <img className="Products__image" src={productImage} alt={item.name} />
        <div className="Products__name">{item.name}</div>
        <small className="Products__type">{item.type}</small>
      </a>
    </li>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired
};

export default Product;
