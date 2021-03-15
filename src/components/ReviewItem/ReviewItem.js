import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name , quantity , key ,price} = props.product;
    return (
        <div style={{borderBottom: '1px solid red'}} className="review-item">
            <h4 className="product-name">Name: {name}</h4>
            <p>Quantity: {quantity}</p>
            <p> <small>{price}</small> </p>
            <br/>
            <button onClick={()=>props.handleRemoveProduct(key)} style={{marginBottom: '15px'}} className="main-btn">Remove</button>
            
        </div>
    );
};

export default ReviewItem;