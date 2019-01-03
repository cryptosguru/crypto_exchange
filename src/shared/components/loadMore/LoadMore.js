import React, { PureComponent } from "react";
import styled from "styled-components";
import { Button } from 'antd';

const StyledLoadMore = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`

export class LoadMore extends PureComponent {
  render() {
    return (
      <StyledLoadMore>
        <Button onClick={this.props.onClick}>Load more</Button>
      </StyledLoadMore>
    )
  }
}