import React, { Component } from "react";
import { getTopListBy24Hours, getCryptoInfoAndExchanges } from '../../services/crypto/crypto-service';
import { List, Avatar } from 'antd';
import styled from 'styled-components';
import { CryptoCurrencyDrawer } from "./components/drawer/CryptocurrencyDrawer";
import { LoadMore } from '../../shared/components/loadMore/LoadMore';
import RouteWrapper from '../../shared/components/routeWrapper/RouteWrapper';

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
const StyledListItem = styled(List.Item)`
  padding: 10px !important;
  cursor: pointer;
  & > div > .ant-list-item-meta-avatar{
    justify-content: center;
  }
  &:hover {
    background-color: #f1f3f5;
  }
`;

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
    exchangesLimit: 10,
    exchangesLoading: false,
    exchanges: []
  };

  componentWillMount() {
    this.search();
  }

  search() {
    this.setState({ loading: true });
    getTopListBy24Hours(this.state.searchInfo).then(cryptos => {
      debugger;
      this.setState({ cryptos: this.state.cryptos.concat(cryptos), loading: false});
    })
  }

  onLoadMore() {
    this.setState({ 
      searchInfo: { ...this.state.searchInfo, page: this.state.searchInfo.page + 1 }
    }, this.search);
  }
  
  itemClicked(item) {
    this.setState({
      drawerVisible: true, activeCoin: item,
      onClose: () => this.closeDrawer(), exchangesLoading: true,
    }, this.loadExchanges );
  }
  
  async loadExchanges() {
    const { coinInfo, exchanges } = await getCryptoInfoAndExchanges(this.state.activeCoin.name, 'USD', this.state.exchangesLimit);
    this.setState({      
      exchangesLoading: false,
      selectedCoinInfo: coinInfo,
      exchanges: exchanges,
      hasMoreExchanges: this.state.exchangesLimit === exchanges.length
    })
  }
  
  closeDrawer() {
    this.setState({
      drawerVisible: false, exchangesLimit: 10, 
      activeCoin: {}, selectedCoinInfo: {}, 
      exchanges: [] 
    });
  }

  renderItem(item) {
    return (
      <StyledListItem key={item.id} item={item} onClick={() => this.itemClicked(item)}>
       <List.Item.Meta
          avatar={<Avatar src={item.imageUrl} />}
          title={<a href={item.href}>{item.displayName}</a>}
          />
        <Price>
          {item.price}
        </Price>
      </StyledListItem>
    )
  }

  loadMore() {
    return !this.state.loading && ( <LoadMore onClick={this.onLoadMore.bind(this)} /> );
  }

  onLoadMoreExchanges() {
    this.setState({ exchangesLimit: this.state.exchangesLimit + 10, exchangesLoading: true }, this.loadExchanges);
  }
  
  render() {
    return (
      <RouteWrapper>
        <CryptoCurrencyDrawer 
          visible={this.state.drawerVisible} 
          cryptocurrencyInfo={this.state.selectedCoinInfo} 
          onClose={() => this.closeDrawer()}
          exchangesLoading={this.state.exchangesLoading}
          exchanges={this.state.exchanges}
          onLoadMoreExchanges={() => this.onLoadMoreExchanges()}
          hasMoreExchanges={this.state.hasMoreExchanges}
          onOpenExchange={console.log}/>
        <ListWrapper>
          <List
            loadMore={this.loadMore()}
            loading={this.state.loading}
            size="small"
            itemLayout="horizontal"
            dataSource={this.state.cryptos}
            renderItem={this.renderItem.bind(this)}
          />
        </ListWrapper>
      </RouteWrapper>
    )
  }

}