import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Checkout/Orders/Orders');
});

function App() {
  return (
    <div className="App">
      <Layout>
          <Suspense fallback={<p>Loading...</p>}>
              <Switch>
                  <Route path="/checkout" render={() => <Checkout />} />
                  <Route path="/orders" render={() => <Orders />} />
                  <Route path="/" render={() => <BurgerBuilder />}/>
              </Switch>
          </Suspense>
      </Layout>
    </div>
  );
}

export default App;
