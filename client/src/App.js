import React, { Component } from 'react';
import { Header } from './components/header/Header';
import { BrowserRouter, Route  } from "react-router-dom";
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
    activeRoute: `/`
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
  this.callBackendAPI()
    .then(res => this.setState({ data: res.express }))
    .catch(err => console.log(err));
}
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
callBackendAPI = async () => {
  const response = await fetch('/test');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

  render() {
    return (
      <div className="App">
        <Global/>
        <BrowserRouter>
          <StyledRouteContent activeRoute={this.state.activeRoute}>
            <Header/>
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
