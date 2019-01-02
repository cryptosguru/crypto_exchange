import React, { Component } from "react";
import { getTopListBy24Hours } from '../../services/crypto/crypto-service';
import { List, Avatar } from 'antd';
import styled from 'styled-components';
import './prices.css';

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

export class Prices extends Component {
  state = { cryptos: [], loading: false, tableLength: 10};

  componentWillMount() {
    this.setState({ loading: true })
    getTopListBy24Hours().then(cryptos => {
      this.setState({ cryptos, loading: false});
    })
  }

  itemClicked(item) {
    return _event => {
      console.log(item);
    }
  }

  renderItem(item) {
    return (
      <List.Item key={item.id} className="cryptocurrency-item" item={item}  onClick={this.itemClicked(item).bind(this)}>
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

  render() {
    return (
      <div>
        <ListWrapper>
          <List
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