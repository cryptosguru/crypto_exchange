import React, { Component } from "react";
import { getTopListBy24Hours, getCryptoInfoAndExchanges, getPricesForCharts } from '../../services/crypto/crypto-service';
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
    exchanges: [],
    priceHistory: [],
    loadingPriceHistory: false
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
      searchInfo: { ...this.state.searchInfo, page: this.state.searchInfo.page + 1 }
    }, this.search);
  }
  
  itemClicked(item) {
    this.setState({
      drawerVisible: true, activeCoin: item,
      exchangesLoading: true, errorMessage: '', loadingPriceHistory: true
    },  this.loadExchanges );
  }

  loadPriceHistory() {
    this.setState({
      loadingPriceHistory: true
    });
    const date = new Date();

    getPricesForCharts(new Date(date.setDate(date.getDate() - 6)), this.state.selectedCoinInfo.name).then(({prices}) => {
      this.setState({
        priceHistory: prices.map(({average, timestamp}) => {
          const date = new Date(timestamp);
          return {
            y: average, x: `${date.getDate()}/${date.getMonth()}`
          };
        }),
        loadingPriceHistory: false
      })
    })
  }
  
  async loadExchanges() {
    const { coinInfo, exchanges, error, errorType, message } = await getCryptoInfoAndExchanges(this.state.activeCoin.name, 'USD', this.state.exchangesLimit);
    if (!error) { 
      this.setState({      
        exchangesLoading: false,
        selectedCoinInfo: coinInfo,
        loadingPriceHistory: true,
        exchanges,
        hasMoreExchanges: this.state.exchangesLimit === exchanges.length
      }, this.loadPriceHistory);
      
    } else {
      switch (errorType) {
        case 'INFO_NOT_FOUND':
          this.setState({      
            exchangesLoading: false,
            selectedCoinInfo: null,
            exchanges: null,
            hasMoreExchanges: false,
            errorMessage: message,
            loadingPriceHistory: false
          })
          break;
        case 'NONE_EXCHANGE_FOUND': 
          this.setState({  
            exchangesLoading: false,
            selectedCoinInfo: coinInfo,
            exchanges: null,
            hasMoreExchanges: false,
            errorMessage: message,
            loadingPriceHistory: true
          }, this.loadPriceHistory);
          break;
        default:
          console.log(`NEW ERROR TYPE ${errorType}`)
      }
    }
  }
  
  closeDrawer() {
    this.setState({
      drawerVisible: false, exchangesLimit: 10, 
      activeCoin: {}, selectedCoinInfo: {}, 
      exchanges: [], priceHistory: []
    });
  }

  renderItem(item) {
    return (
      <StyledListItem key={item.id} item={item} onClick={() => this.itemClicked(item)}>
       <List.Item.Meta
          avatar={<Avatar src={item.imageUrl} />}
          title={<a href={item.href}>{item.displayName}</a> }/>
        <Price> {item.price} </Price>
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
          errorMessage={this.state.errorMessage}
          onOpenExchange={console.log}
          priceHistory={this.state.priceHistory}
          loadingPriceHistory={this.state.loadingPriceHistory}
          />
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