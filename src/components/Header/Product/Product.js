import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    //console.log(props);
    const {img , name , seller , price , stock} = props.product ;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>

            </div>
           
           <div>
                <h4 className="product-name">{name}</h4>
                <p><small>By : {seller}</small></p>
                <br/>
                <p>$ {price}</p>
                <br/>
                <p><small>Only {stock} left in stock order soon</small></p>
                <button className="main-btn" onClick={()=>props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
           </div>
            
        </div>
    );
};

export default Product;