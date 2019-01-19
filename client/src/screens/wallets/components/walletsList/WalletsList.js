import React, { PureComponent } from "react";
import styled from "styled-components";
import { List, Avatar } from 'antd';

const PropertyLabel = styled.label`
  color: rgba(0, 0, 0, 0.5);
`

const Properties = styled.div`
  display: flex;
`

const Property = styled.div`
  padding: 0px 10px;
`

const ListContainer = styled.div`
  width: 90%;
  padding: 10px 30px;
  border: 1px solid #ebedf0;
`


export class WalletsList extends PureComponent {
  render() {
    return (
      <ListContainer style={{marginTop: 20}} >
            <List itemLayout="vertical" size="large" loading={this.props.loading} 
              pagination={{ pageSize: 10 }} dataSource={this.props.list}
              renderItem={wallet => (
                <List.Item key={wallet.name}
                  extra={ <img width={100} alt="logo" src={wallet.logoUrl} />} >
                  <List.Item.Meta
                    avatar={ <Avatar src={wallet.logoUrl} /> }
                    title={<a target="_blank" rel="noopener noreferrer"
                    href={wallet.url}>{wallet.name}</a>} />
                <Properties>
                  <Property>
                    <PropertyLabel>Anonymity:  </PropertyLabel>{ wallet.anonymity }
                  </Property>
                  <Property>
                    <PropertyLabel>Security:  </PropertyLabel>{ wallet.security }
                  </Property>
                  <Property>
                    <PropertyLabel>Coins:  </PropertyLabel>{ wallet.coins.join(', ') }
                  </Property>
                </Properties>
                </List.Item>
              )}
            />
          </ListContainer>
    )
  }
}