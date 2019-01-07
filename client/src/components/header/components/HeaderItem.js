import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Menu, Icon } from 'antd';

const StyledHeaderItem = styled.div`
  & > a {
    color: #69c0ff;
    font-size: 25px;
    padding: 0px 15px;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    user-select: none;
    &:hover {
      color: #0050b3;
    }
    &:hover {
      outline: none;
    }
  }
`

const StyledLink = styled(Link)`
  &:focus {
    text-decoration: none;
  }
`


export class HeaderItem extends PureComponent {

  static propTypes = {
    to: PropTypes.string,
    label: PropTypes.string
  }

  static defaultProps = {
    to: 'No to specifed ',
    label: 'No Label Specified'
  }

  render() {
    return (
      <Menu.Item key={this.props.to}>
          <StyledLink to={this.props.to}>
            <Icon type="fullscreen"/>{ this.props.label}
          </StyledLink>
      </Menu.Item>
      
      // <StyledHeaderItem>
      //   <StyledLink to={this.props.to}>
      //     { this.props.label}
      //   </StyledLink>
      
      // </StyledHeaderItem>
    )
  }
}
