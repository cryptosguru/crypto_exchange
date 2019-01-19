import React, { PureComponent } from 'react';
import { Input, Select, Button } from "antd";
import styled from "styled-components";

const { Option } = Select;

const FilterContainer = styled.div`
  padding: 15px 24px 50px;
  height: 150px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ebedf0;
`

const FiltersWrapper = styled.div`
  padding-top: 15px;
  display: flex;
  align-items: center;
`

const Filter = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export class WalletsFilters extends PureComponent {

  constructor(props) {
    super(props);
    this.callChangedSecurity = this.callChangedSecurity.bind(this);
  }

  callChangedSecurity(value) {
    this.props.handleChange({target: {name: 'anonymity', value }});
  }
  
  render () {
    return (
      <FilterContainer>
        <h3>Filters</h3>
        <FiltersWrapper>
          <Filter>
            <label>Coin</label>
            <Input size="large" name="coin" value={this.props.coin}
              onChange={this.props.handleChange} placeholder="Ex: BTC"
              onPressEnter={this.props.onFilter} />
          </Filter>
          <Filter>
            <label>Security</label>
            <Select name="anonymity" size="large" defaultValue={this.props.anonymity}
              onChange={this.callChangedSecurity} style={{width: 150}}>
              <Option key="high" value="high">High</Option>
              <Option key="medium" value="medium">Medium</Option>
              <Option key="low" value="low" >Low</Option>
            </Select>
          </Filter>
          <Button size="large" onClick={this.props.onFilter}
            style={{ marginTop: 20}} type="primary" icon="search">Search</Button>
        </FiltersWrapper>
      </FilterContainer>
    )
  }
}