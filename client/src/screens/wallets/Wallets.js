import React, {
  Component
} from 'react';
import styled from "styled-components";
import RouteWrapper from '../../shared/components/routeWrapper/RouteWrapper';
import {
  getAllWallets
} from '../../services/crypto/crypto-service';
import {
  WalletsFilters
} from './components/walletsFilters/WalletsFilter';
import { List, Icon, Avatar } from 'antd';

const StyledRoute = styled.div `
    padding-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const ListContainer = styled.div`
  width: 90%;
  padding: 10px 30px;
  border: 1px solid #ebedf0;
`

export class Wallets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wallets: [],
      loading: false,
      anonymity: "medium"
    }
    this.handleFilterChanged = this.handleFilterChanged.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }

  handleFilterChanged(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  applyFilters() {
    console.log('Applying Filters');
  }

  componentWillMount() {
    this.setState({ loading: true }, 
      async () => {
        try {
          const wallets = await getAllWallets();
          this.setState({ wallets, loading: false })
        } catch (error) {
          console.error(error);
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
        <StyledRoute>
          <WalletsFilters handleChange={this.handleFilterChanged}
            anonymity={this.state.anonymity} coin={this.state.coin} 
            onFilter={this.applyFilters}/>        
          <ListContainer style={{marginTop: 20}} >
            <List
              itemLayout="vertical"
              size="large"
              loading={this.state.loading}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 10,
              }}
              dataSource={this.state.wallets}
              renderItem={wallet => (
                <List.Item
                  key={wallet.name}
                  actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                  extra={
                    <img width={100} alt="logo" src={wallet.logoUrl} />}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={wallet.avatar} />}
                    title={<a href={wallet.href}>{wallet.title}</a>}
                    description={wallet.description}
                  />
                  {wallet.content}
                </List.Item>
              )}
            />
          </ListContainer>
        </StyledRoute>
      </RouteWrapper>
    )
  }
}