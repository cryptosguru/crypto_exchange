import React, { PureComponent } from "react";
import { List } from "antd";
import styled from 'styled-components';

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
    return (
      <Wrapper>
        <List
          loading={this.props.loading}
          dataSource={this.props.exchanges} 
          renderItem={item => (<ListItem className="exchange" onClick={() => this.props.onClick(item)}>{item.MARKET}</ListItem>)}>

        </List>
      </Wrapper>
    );
  }
}
