import React, { createContext, useState } from 'react'
import './App.css';
import Header from './components/Header/Header.js'
import Shop from './components/Header/Shop/Shop';
import Review from './components/Review/Review'
import Inventory from './components/Inventory/Inventory'
import NotFound from './NotFound/NotFound'
import ProductDetail from './components/ProductDetail/ProductDetail'
import CSSShipment from  '../src/components/Shipment/Shipment.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App(props) {

  // set state
  
  const [loggedInUser , setLoggedInUser] = useState({});


  return (
    <UserContext.Provider value={[loggedInUser , setLoggedInUser]}>
      <h3>Login Email: {loggedInUser.email}</h3>
     
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/review">
          <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
          <Inventory></Inventory>
          </PrivateRoute>

          <Route path="/Login">
          <Login></Login>
          </Route>

          <PrivateRoute path="/Shipment">
          <Shipment></Shipment>
          </PrivateRoute>

          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">  
          {/* ProductKey is a paramiter from key */}
            <ProductDetail></ProductDetail>

          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
     
     
      
      
    </UserContext.Provider>
  );
}

export default App;
