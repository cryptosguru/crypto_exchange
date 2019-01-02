import React, { PureComponent } from "react";
import styled from "styled-components";
import { IntroComponent } from './components/intro/IntroComponent';

const StyledContent = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
  flex-direction: column;
`


export class LandingPage extends PureComponent {
  render() {
    return (
      <StyledContent>
        <IntroComponent/>
      </StyledContent>
    )
  }
}