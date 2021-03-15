import React, { useEffect, useState } from 'react';
import fakeData from '../../../fakeData';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../../Cart/Cart'
import {Link} from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';

const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const [products , setProducts] = useState(first10);
    const [cart , setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productsKeys = Object.keys(savedCart);
        const previousCart = productsKeys.map(existingKey =>{
            const product = fakeData.find(pd => pd.key === existingKey);
            console.log(existingKey , savedCart[existingKey]);
            product.quantity = savedCart[existingKey];
            return product;

        })
        //console.log(previousCart);
        setCart(previousCart);

    },[])

    const handleAddProduct =(product)=>{
        const toBeAddedKey = product.key;
        const sameProduct =cart.find(pd => pd.key === toBeAddedKey)
        let count = 1 ;
        let newCart ;
        if(sameProduct){
            count = sameProduct.quantity + 1 ;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !==toBeAddedKey);
            newCart = [...others,sameProduct]
        }
        else{
            product.quantity = 1 ;
            newCart = [...cart , product]
        }
        
        //console.log('added' , product);
       
        setCart(newCart);
        //kapsi
       
        addToDatabaseCart(product.key , count)
    }
    
    return (

        <div className="twin-container">
            

            
            <div className="product-container">
                  
                     {
                            products.map(pd=> <Product key={pd.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={pd}></Product>)
                     }
                 

            </div>
           

            <div className="cart-coontainer">
                <Cart cart = {cart}>
                    <Link to ="/review">
                    <button className="main-btn">Review Order</button>

                    </Link>

                </Cart>
                
            </div>
            
            
        </div>
    );
};

export default Shop;