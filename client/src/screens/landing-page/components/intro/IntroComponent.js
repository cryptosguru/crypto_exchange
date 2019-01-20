import React, { PureComponent } from "react";
import styled from 'styled-components';
import { CryptoFooIntro } from './components/CryptoFooIntro';

const Intro = styled.div`
  height: 100%;
  background: transparent;
  display: flex;
`
export class IntroComponent extends PureComponent {
  render() {
    return (
      <Intro>
        <CryptoFooIntro/>
      </Intro>
    )
  }

}
