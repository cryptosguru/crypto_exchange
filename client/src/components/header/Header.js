import React, { PureComponent } from 'react';
import styled from 'styled-components'
import { HeaderItem } from './components/HeaderItem';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  height: 8%;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;
export class Header extends PureComponent {

  render() {
    return (
      <StyledHeader>
        <HeaderItem to="/" label="Home"/>
        <HeaderItem to="prices" label="Prices"/>
        <HeaderItem to="about" label="About"/>
        <HeaderItem to="wallets" label="Wallets"/>
      </StyledHeader>
    )
  }
}