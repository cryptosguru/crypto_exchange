import React from "react";
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin: 0 auto;
`
const Title = styled.span`
  font-size: 50px;
  line-height: 80px;
  color: black;
  text-align: center;
  word-wrap: break-word;
`

const Subtitle = styled(Title)`
  line-break: auto;
  font-size: 35px;
`

const CryptoFooIntro = () => 
  <StyledContainer>
    <Title>Crypto-Foo</Title>
    <Subtitle> Cryptocurrency's prices, help and wallets</Subtitle>
  </StyledContainer>

export { CryptoFooIntro }