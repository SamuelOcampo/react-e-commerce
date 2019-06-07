import React from 'react';
// redux
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
// react-router-dom
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// layout
import MainLayout from './layouts/MainLayout';
// pages
import Home from './pages/Home';
import Cart from './pages/Cart';

const { store, persistor } = configureStore();
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <MainLayout><Home/></MainLayout>}
              />
              <Route exact path="/cart" component={Cart} />
              <Route component={() => <h1>404</h1>} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
