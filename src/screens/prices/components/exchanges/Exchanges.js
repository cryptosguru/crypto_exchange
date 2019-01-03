import React, { PureComponent } from "react";
import { List, Button } from "antd";
import styled from 'styled-components';
import { StyledLoadMore } from '../../Prices';

const Wrapper = styled.div`
  padding: 5px 10px;
  border: 1px solid #ebedf0;
`

const ListItem = styled(List.Item)`
  padding: 12px 10px !important;
  &:hover{
    cursor: pointer;
    background-color: #ebedf0;
  }
`

export class Exchanges extends PureComponent {
  
  render() {
    const loadMore = !this.props.loading && this.props.hasMoreExchanges && (
      <StyledLoadMore>
        <Button onClick={this.props.onLoadMore.bind(this)}>Load more</Button>
      </StyledLoadMore>
    )
    console.log(this.props);
    return (
      <Wrapper>
        <List
          loading={this.props.loading}
          dataSource={this.props.exchanges}
          loadMore={loadMore}
          renderItem={item => (<ListItem className="exchange" onClick={() => this.props.onClick(item)}>{item.MARKET}</ListItem>)}>

        </List>
      </Wrapper>
    );
  }
}
