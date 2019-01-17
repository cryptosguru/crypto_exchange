import React, { Component } from 'react';
import { Select } from "antd";
import styled from "styled-components";

const FiltersWrapper = styled.div`
  height: 75px;
  display: flex;
  flex-direction: column;
`

export class WalletsFilters extends Component {
  timeout;

  handleFiltersWithTimeout(name) {
    return (event) => {
      window.console.log(event);
      if (this.timeout){
        clearTimeout(this.timeout)
        setTimeout(() => {
          this.props.filterChanged()
        })
      }
    }
  }
  render () {
    return (
      <FiltersWrapper>
        <h3>Filters</h3>
        <div>
          <label>Coin</label>
          <Select onChange={this.handleFiltersWithTimeout('coin')}>
            {this.props.coins.map(coin => (
              <Select.Option value={coin.name} key={coin.name}>
                {coin.displayName}
              </Select.Option>
            ))}
          </Select>
        </div>
      </FiltersWrapper>
    )
  }
}