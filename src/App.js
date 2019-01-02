import React, { Component } from 'react';
import { Header } from './components/header/Header';
import { BrowserRouter, Route  } from "react-router-dom";
import { LandingPage } from './screens/landing-page/LandingPage';
import { Prices } from './screens/prices/Prices';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import styled, { createGlobalStyle } from "styled-components";

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

// const routesBackgrounds = {
//  '/' : 'linear-gradient(to right, #0050b3, #22075e)'
// };

const StyledRouteContent = styled.div`
  height: 100%;
`

class App extends Component {
  state = {
    activeRoute: `/`
  }
  render() {
    return (
      <div className="App">
        <Global/>
        <BrowserRouter>
          <StyledRouteContent activeRoute={this.state.activeRoute}>
            <Header> </Header>
            <Route path="/" exact component={ LandingPage }/>
            <Route path="/prices" exact component={ Prices }/>
          </StyledRouteContent>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
