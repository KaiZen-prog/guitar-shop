import React from 'react';
//import {Redirect, Switch, Route, BrowserRouter} from 'react-router-dom';
import {Redirect, Switch, Route, HashRouter} from 'react-router-dom';
import {AppRoute} from '../../const';
import Header from '../header/header';
import Catalog from '../catalog/catalog';
import Cart from '../cart/cart';
import Footer from '../footer/footer';


const App = () => {
  return (
  <HashRouter>
    <div className="app">
      <Header/>
      <main className="app__main">
        <Switch>
          <Route exact path={AppRoute.ROOT} component={Catalog}/>
          <Route exact path={AppRoute.CART} component={Cart}/>
          <Redirect to={AppRoute.ROOT}/>
        </Switch>
      </main>
      <Footer/>
    </div>
  </HashRouter>
  );
};

App.displayName = 'App';

export default App;
