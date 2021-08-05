import React from 'react';
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom';
import {AppRoute} from "../../const";
import Header from '../header/header';
import Catalog from '../catalog/catalog';
import Cart from '../cart/cart';
import Footer from "../footer/footer";


const App = () => {
  return (
  <BrowserRouter>
    <div className="app">
      <Header/>
      <main className="app__main">
        <Switch>
          <Redirect from={AppRoute.ROOT} to={AppRoute.CATALOG} exact />
          <Route path={AppRoute.CATALOG} exact>
            <Catalog/>
          </Route>
          <Route path={AppRoute.CART} exact>
            <Cart/>
          </Route>
        </Switch>
      </main>
      <Footer/>
    </div>
  </BrowserRouter>
  );
};

App.displayName = `App`;

export default App;
