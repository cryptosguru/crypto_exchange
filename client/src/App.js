import React, { Component } from 'react';
import { Header } from './components/header/Header';
import { BrowserRouter, Route } from "react-router-dom";
import { LandingPage } from './screens/landing-page/LandingPage';
import { Prices } from './screens/prices/Prices';
import 'antd/dist/antd.css';
import styled, { createGlobalStyle } from "styled-components";
import { About } from './screens/about/About';
import { Wallets } from './screens/wallets/Wallets';

const Global = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
  }
  body, html {
    font-family: 'Roboto', sans-serif;
    width: 100%;
    height: 100%;
  }
  .App, #root {
    height: 100%;
  }
`

const StyledRouteContent = styled.div`
  height: 100%;
`

class App extends Component {
  state = {
    activeRoute: window.location.pathname || '/'
  }

  routeChanged(activeRoute) {
    this.setState({ activeRoute });
  }

  render() {
    return (
      <div className="App">
        <Global/>
        <BrowserRouter>
          <StyledRouteContent activeRoute={this.state.activeRoute}>
            <Header onChangeRoute={(route) => this.routeChanged(route)} current={this.state.activeRoute}/>
            <Route path="/" exact component={ LandingPage }/>
            <Route path="/prices" exact component={ Prices }/>
            <Route path="/about" exact component={ About }/>
            <Route path="/wallets" exact component={ Wallets }/>
          </StyledRouteContent>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
