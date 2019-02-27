import React from "react";
import styled from "styled-components";
import { Button } from 'antd';

const StyledLoadMore = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`

const LoadMore = ({ onClick }) => 
  <StyledLoadMore>
    <Button onClick={onClick}>Load more</Button>
  </StyledLoadMore>

export { LoadMore }
  