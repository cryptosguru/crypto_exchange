import React, {
  Component
} from 'react';
import styled from "styled-components";
import RouteWrapper from '../../shared/components/routeWrapper/RouteWrapper';
import {
  getAllWallets,
  getAllCoins
} from '../../services/crypto/crypto-service';
import {
  WalletsFilters
} from './components/walletsFilters/WalletsFilter';

const StyledRoute = styled.div `
    padding-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
`

export class Wallets extends Component {
  state = {
    wallets: [],
    loading: false
  }

  componentWillMount() {
    this.handleFilter = this.handleFilter.bind(this);

    this.setState({
      loading: true
    }, async () => {
      try {
        const wallets = getAllWallets();
        this.setState({ wallets })
      } catch (error) {

      }
    })
  }

  async handleFilter(coin, security) {
    const wallets = await getAllWallets(coin, security);
    this.setState({ wallets });

  }

  render() {
    return ( 
      <RouteWrapper>
        <StyledRoute> Wallets </StyledRoute> 
        <WalletsFilters filterChanged={this.handleFilter} coins={this.state.coins || []} >
        </WalletsFilters> 
      </RouteWrapper>
    )
  }
}