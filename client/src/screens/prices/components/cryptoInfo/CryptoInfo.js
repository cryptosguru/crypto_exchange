import React from "react";
import styled from "styled-components";
import { Button } from 'antd';


const StyledInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 5px;
`

const StyledInfo = styled.div`
  display: flex;
  user-select: none;
  flex-direction: column;
  text-align: center;
  & > label {
    color: rgba(0, 0, 0, 0.65);
  }
  color: black;
`

const CryptoInfo = ({ totalCoinsMined, overviewUrl }) => 
  <StyledInfoWrapper>
    <StyledInfo>
      <Button type="primary" onClick={() => window.open(overviewUrl)}>Overview</Button>
    </StyledInfo>
    <StyledInfo>
      <label>Total coins mined</label>
      <span>{totalCoinsMined}</span>
    </StyledInfo>
  </StyledInfoWrapper>

export { CryptoInfo }
