import React, { Component } from "react";
import { getTopListBy24Hours, getCryptoInfoAndExchanges } from '../../services/crypto/crypto-service';
import { List, Avatar, Button } from 'antd';
import styled from 'styled-components';
import './prices.css';
import { CryptoCurrencyDrawer } from "./components/drawer/CryptocurrencyDrawer";

const ListWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  border: 1px solid #ebedf0;
  border-radius: 4px;
  padding: 10px 15px;
`

const Price = styled.div`
  user-select: none;
`

const StyledLoadMore = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`

export class Prices extends Component {
  state = { 
    cryptos: [], 
    loading: false, 
    searchInfo: {
      limit: 10,
      symbol: 'USD',
      page: 0 
    },
    activeCoin: {},
    drawerVisible: false,
    exchangesLoading: false,
    exchanges: []
  };

  componentWillMount() {
    this.search();
  }

  search() {
    this.setState({ loading: true });
    getTopListBy24Hours(this.state.searchInfo).then(cryptos => {
      this.setState({ cryptos: this.state.cryptos.concat(cryptos), loading: false});
    })
  }

  onLoadMore() {
    this.setState({
      searchInfo: {
        ...this.state.searchInfo,
        page: this.state.searchInfo.page + 1
      }
    });
    setTimeout(() => this.search(), 0);
  }
  
  async itemClicked(item) {
    this.setState({
      drawerVisible: true,
      activeCoin: item,
      onClose: () => this.closeDrawer(),
      exchangesLoading: true
    });
    console.log(item);
    const data = await getCryptoInfoAndExchanges(item.name, 'USD', 10);
    this.setState({
      exchangesLoading: false,
      exchanges: data.Exchanges
    })
    console.log(data);
  }
  
  closeDrawer() {
    this.setState({
      drawerVisible: false,
      activeCoin: {},
      exchanges: []
    });
  }

  renderItem(item) {
    return (
      <List.Item key={item.id} className="cryptocurrency-item" item={item} onClick={() => this.itemClicked(item)}>
       <List.Item.Meta
          avatar={<Avatar src={item.imageUrl} />}
          title={<a href={item.href}>{item.displayName}</a>}
          />
        <Price>
          {item.price}
        </Price>
      </List.Item>
    )
  }

  loadMore() {
    return !this.state.loading && (
      <StyledLoadMore>
        <Button onClick={this.onLoadMore.bind(this)}>Load more</Button>
      </StyledLoadMore>
    );
  }
  
  render() {
    return (
      <div>
        <CryptoCurrencyDrawer visible={this.state.drawerVisible} 
          cryptocurrencyInfo={this.state.activeCoin} 
          onClose={() => this.closeDrawer()}
          exchangesLoading={this.state.exchangesLoading}
          exchanges={this.state.exchanges}
          onOpenExchange={console.log}
        />
        <ListWrapper>
          <List
            loadMore={this.loadMore()}
            loading={this.state.loading}
            size="small"
            itemLayout="horizontal"
            dataSource={this.state.cryptos}
            renderItem={this.renderItem.bind(this)}
          >

          </List>
        </ListWrapper>
      </div>
    )
  }

}