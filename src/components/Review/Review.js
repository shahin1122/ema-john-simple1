import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart'
import placedImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    
    const [cart , setCart] = useState([]);
    const [orderPlaced , setOrderPlaced]= useState(false);

    const history = useHistory()


    const handleProceedCheakout = () => {
        
        history.push('./Shipment')


    }

    const handleRemoveProduct = (productsKey) => {
        //console.log('Removed clicked');
        const newCart = cart.filter(pd => pd.key !== productsKey)
        setCart(newCart);
        removeFromDatabaseCart(productsKey);
    }


    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productsKeys = Object.keys(savedCart)
        const cartProducts= productsKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product ;
            
        });
        setCart(cartProducts);

    },[]);

        let thankYou ; 
        if(orderPlaced){
            thankYou = <img src={placedImage} alt=""/>
        }

    return (
        <div className = "twin-container">
            
           <div className="product-container">
           {
                cart.map(pd => 
                    <ReviewItem 
                    handleRemoveProduct= {handleRemoveProduct} key = {pd.key} product={pd}>

                    </ReviewItem>)
            }
            {
                thankYou
            }

           </div>
           <div className="cart-container">
               <Cart cart={cart}>
                   <button onClick={handleProceedCheakout} className="main-btn">Proceed Cheakout</button>
               </Cart>
               

           </div>
            
        </div>
    );
};

export default Review;