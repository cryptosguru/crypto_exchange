import React, { Component } from 'react';
import styled from "styled-components";
import RouteWrapper from '../../shared/components/routeWrapper/RouteWrapper';
import { getAllWallets } from '../../services/crypto/crypto-service';
import { WalletsFilters } from './components/walletsFilters/WalletsFilter';
import { WalletsList } from './components/walletsList/WalletsList';

const StyledRoute = styled.div `
    padding-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export class Wallets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallets: [],
      loading: true,
      anonymity: "Medium",
      coin: ''
    }
    this.handleFilterChanged = this.handleFilterChanged.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }

  handleFilterChanged(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  applyFilters() {
    const { coin, anonymity } = this.state;
    this.setState({ loading: true }, async () => {
      const wallets = await getAllWallets(coin, anonymity);
      this.setState({ wallets, loading: false });
    });
  }

  componentDidMount() {
    getAllWallets()
      .then(wallets => this.setState({ wallets, loading: false }))
      .catch(console.error);
  }

  render() {
    return ( 
      <RouteWrapper>
        <StyledRoute>
          <WalletsFilters handleChange={this.handleFilterChanged}
            anonymity={this.state.anonymity} coin={this.state.coin}
            onFilter={this.applyFilters}/>
          <WalletsList list={this.state.wallets} loading={this.state.loading}/>
        </StyledRoute>
      </RouteWrapper>
    )
  }
}