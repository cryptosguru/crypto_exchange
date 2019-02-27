import React from "react";
import styled from 'styled-components';
import { CryptoFooIntro } from './components/CryptoFooIntro';

const Intro = styled.div`
  height: 100%;
  background: transparent;
  display: flex;
`
const IntroComponent = () => 
  <Intro>
    <CryptoFooIntro/>
  </Intro>

export { IntroComponent }
