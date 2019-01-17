import React, { Component } from 'react';
import styled from "styled-components";
import RouteWrapper from '../../shared/components/routeWrapper/RouteWrapper';
import { getAllWallets } from '../../services/crypto/crypto-service';
import { WalletsFilters } from './components/walletsFilters/WalletsFilter';

const StyledRoute = styled.div`
    padding-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
`

export class Wallets extends Component {
    state = {
        wallets: []
    }

    componentWillMount() {
        getAllWallets()
    }

    render() {
        return (
            <RouteWrapper>
                <StyledRoute>Wallets</StyledRoute>
                <WalletsFilters></WalletsFilters>
            </RouteWrapper>
        )
    }
}