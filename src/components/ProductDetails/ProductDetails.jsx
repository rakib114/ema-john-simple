import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams()
    const [product, setProduct] = useState({});
    useEffect(()=>{
        fetch('http://localhost:5000/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    },[productKey])
    // const product = fakeData.find(pd => pd.key === productKey);
    // console.log(product);
    return (
        <div>
            {
          product.length === 0 && <p>Loading...</p>
           }
            <h1>Your Product Details is Here</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;