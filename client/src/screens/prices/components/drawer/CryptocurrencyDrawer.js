import React, { Component } from "react";
import { Drawer, Divider, Avatar, Spin } from "antd";
import styled from "styled-components";
import { Exchanges } from "../exchanges/Exchanges";
import { CryptoInfo } from '../cryptoInfo/CryptoInfo';
import { PriceChart } from '../../../../shared/components/graphs/chart/PriceChart';

const StyledCoinAvatarAndTitle = styled.div `
  padding-top: 5px;
  display: flex;
  align-items: center;
`

const Title = styled.span`
  padding-left: 20px;
  font-size: 25px;
`

const ExchangesTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 22px;
  padding: 5px 0px 20px 0px;
`

const GraphWrapper = styled.div`
  width: 100%;
  height: 350px;
  text-align: center;
  padding-bottom: 40px;
`

const LoadingChart = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 350px;
`

export class CryptoCurrencyDrawer extends Component {
  render() {
    return (
      <Drawer
        visible={this.props.visible}
        width={800}
        placement="right"
        onClose={this.props.onClose}> 
        { this.props.cryptocurrencyInfo && (
          <>
            <StyledCoinAvatarAndTitle>
              <Avatar size="large" src={this.props.cryptocurrencyInfo.imageUrl} />
              <Title>
                {this.props.cryptocurrencyInfo.displayName}
              </Title>
            </StyledCoinAvatarAndTitle>
            <Divider />
            { !this.props.exchangesLoading && (<CryptoInfo cryptocurrency={this.props.cryptocurrencyInfo}/>) }
          </>
        )}
        {
          !this.props.loading && this.props.loadingPriceHistory && 
            ( <LoadingChart> <Spin/> </LoadingChart> )
        }
        {
          !this.props.loadingPriceHistory && this.props.priceHistory && (
            <>
              <Title>{this.props.cryptocurrencyInfo.price}</Title>
              <Divider/>
              <GraphWrapper>
                <Title>Last five days history</Title>
                <PriceChart data={this.props.priceHistory} />
              </GraphWrapper>
              <Divider/>
            </>
          )
        }
        { this.props.exchanges && (
          <>
            <ExchangesTitle>Exchanges that trade this cryptocurrency</ExchangesTitle>
              <Exchanges 
              loading={!this.props.loading && this.props.exchangesLoading} 
              exchanges={this.props.exchanges}
              onClick={this.props.onOpenExchange}
              onLoadMore={this.props.onLoadMoreExchanges}
              hasMoreExchanges={this.props.hasMoreExchanges}/>
          </>
        )}
        { this.props.errorMessage && (
          <> { this.props.errorMessage } </>
        )

        }
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
