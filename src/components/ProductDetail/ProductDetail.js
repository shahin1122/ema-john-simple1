import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '..//../components/Header/Product/Product'

const ProductDetail = () => {
    // using Hooks
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);

    return (
        <div>
            <h1> {productKey} Product detail</h1>
            <Product showAddToCart={false} product={product}></Product>
            
        </div>
    );
};

export default ProductDetail;