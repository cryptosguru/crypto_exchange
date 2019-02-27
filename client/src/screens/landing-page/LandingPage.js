import React from "react";
import styled from "styled-components";
import { IntroComponent } from './components/intro/IntroComponent';
import RouteWrapper from '../../shared/components/routeWrapper/RouteWrapper';

const StyledContent = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
  flex-direction: column;
`

const LandingPage = () =>
  <RouteWrapper>
    <StyledContent>
      <IntroComponent/>
    </StyledContent>
  </RouteWrapper>

export { LandingPage }
