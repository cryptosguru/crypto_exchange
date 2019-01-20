import React, { PureComponent } from "react";
import { List } from "antd";
import styled from 'styled-components';
import { LoadMore } from '../../../../shared/components/loadMore/LoadMore';

const Wrapper = styled.div`
  padding: 5px 10px;
  border: 1px solid #ebedf0;
`

const ListItem = styled(List.Item)`
  padding: 12px 10px !important;
  & > .ant-list-item-content-single {
    justify-content: space-between;
  }
`

export class Exchanges extends PureComponent {
  render() {
    const loadMore = !this.props.loading && this.props.hasMoreExchanges && 
      ( <LoadMore onClick={this.props.onLoadMore} /> );
    return (
      <Wrapper>
        <List
          loading={this.props.loading}
          dataSource={this.props.exchanges}
          loadMore={loadMore}
          renderItem={item => (
            <ListItem className="exchange" onClick={() => this.props.onClick(item)}>
              <span>{item.name}</span><span title={item.price}>{item.price}</span>
            </ListItem>)}>
        </List>
      </Wrapper>
    );
  }
}
