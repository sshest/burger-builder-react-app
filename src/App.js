import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import asyncComponent from './hoc/asyncComponent';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Checkout/Orders/Orders');
});

function App() {
  return (
    <div className="App">
      <Layout>
          <Switch>
              <Route path="/checkout" component={asyncCheckout} />
              <Route path="/orders" component={asyncOrders} />
              <Route path="/" component={BurgerBuilder}/>
          </Switch>
      </Layout>
    </div>
  );
}

export default App;
