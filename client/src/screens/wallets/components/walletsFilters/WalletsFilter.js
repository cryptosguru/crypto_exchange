import React from 'react';
import { Select } from "antd";
import styled from "styled-components";

const FiltersWrapper = styled.div`
  height: 75px;
  display: flex;
  flex-direction: column;
`

export const WalletsFilters = props => {
  return (
    <FiltersWrapper>
      <h3>Filters</h3>
      <div>
        <label>Coin</label>
        <Select onChange={this.props.coinChanged}>
          {props.coinsOptions.map(coin => (
            <Select.Option value={coin.name}>
              {coin.displayName}
            </Select.Option>
          ))}
        </Select>
      </div>
    </FiltersWrapper>
  )
}