import React, { PureComponent } from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';

const StyledLink = styled(Link)`  
  &:focus {
    text-decoration: none;
  }
`

const StyledMenuItem = styled(Menu.Item)`
  a {
   color: ${props => props.isactive === "true" ? '#1890ff': 'rgba(0, 0, 0, 0.65)'} !important;
  }
  border-bottom: 2px solid ${props => props.isactive === "true" ? '#1890ff': 'transparent'} !important;
`

export class Header extends PureComponent {
  items = [
    { route: "", label: "Home", icon: 'home'},
    { route: "prices", label: "Prices", icon: 'dollar'},
    { route: "about", label: "About", icon: 'info-circle'},
    { route: "wallets", label: "Wallets", icon: 'wallet'}
  ];
  render() {
    return (
      <Menu 
        onClick={this.handleClick}
        selectedKeys={[this.props.current]}
        mode="horizontal"
        style={{ display: `flex`, justifyContent: 'center' }}
        >
        {this.items.map(({ route, label, icon}) => (
         <StyledMenuItem onClick={() => this.props.onChangeRoute(route)} key={route} isactive={(this.props.current === route).toString()}>
          <StyledLink to={route} >
            <Icon type={icon}/>{label}
          </StyledLink>
         </StyledMenuItem>
        ))}
      </Menu>
    )
  }
}