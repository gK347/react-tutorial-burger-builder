import React, { Component } from "react";
import "./App.css";
import Layout from "./Components/Layouts/Layout";
import BurgerBuilder from "./Components/BurgerBuilder/BurgerBuilder";
import Checkout from "./Components/Checkout/Checkout";
import Orders from "./Components/Orders/Orders";
import Auth from "./Components/Auth/Auth";
import { Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
