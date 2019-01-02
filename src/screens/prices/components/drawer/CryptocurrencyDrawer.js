import React, { Component } from "react";
import { Drawer, Divider, Avatar } from "antd";
import styled from "styled-components";
import { Exchanges } from "../exchanges/Exchanges";

const CoinInfo = styled.div`
  padding-top: 5px;
  display: flex;
  align-items: center;
`

const Title = styled.span`
  padding-left: 20px;
  font-size: 25px;
`

export class CryptoCurrencyDrawer extends Component {
  render() {
    return (
      <Drawer
        visible={this.props.visible}
        width={640}
        placement="right"
        onClose={this.props.onClose}
      > 
        <CoinInfo>
          <Avatar size="large" src={this.props.cryptocurrencyInfo.imageUrl} />
          <Title>
            {this.props.cryptocurrencyInfo.displayName}
          </Title>
        </CoinInfo>
        <Divider />
        <Exchanges>
          
        </Exchanges>
      </Drawer>
    );
  }
}

CryptoCurrencyDrawer.defaultProps = {
  visible: false,
  exchangesLoading: false,
  exchanges: [],
  cryptocurrencyInfo: {},
  onClose: () => {}
};
