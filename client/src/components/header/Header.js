import React, { PureComponent } from 'react';
import styled from 'styled-components'
import { HeaderItem } from './components/HeaderItem';
import { Menu } from 'antd';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  height: 8%;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;
export class Header extends PureComponent {
  handleClick() {

  }
  render() { 
    return (
      <Menu 
        onClick={this.handleClick}
        selectedKeys={[this.props.current]}
        mode="horizontal">
        <HeaderItem to="/" label="Home"/>
        <HeaderItem to="prices" label="Prices"/>
        <HeaderItem to="about" label="About"/>
        <HeaderItem to="wallets" label="Wallets"/>
      </Menu>
    )
  }
}