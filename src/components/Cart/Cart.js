import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    //const total = cart.reduce((total , prd ) => total+ prd.price ,0)
    let total = 0 ; 
    for(let i=0 ; i< cart.length ; i++){
        const product = cart[i];
        total = total + product.price * product.quantity ;
       
    }

    let shipping = 0 ; 

    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99 ;
    }
    else if(total >0){
        shipping = 12.99;
    }

    const tax =Math.round(total / 10 ).toFixed(2) ;

    const grandTotal = (total+shipping+Number(tax)).toFixed(2);


    return (
        <div>
            <h4>Order Summery </h4>
            <p>Items Orderd: {cart.length}</p>
            <p>Product Price : {total.toFixed(2)}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Shipping cost:{tax} </small></p>
            <p>Total price : {grandTotal} </p>
            <br/>
            {
                props.children
            }
           
            
        </div>
    );
};

export default Cart;