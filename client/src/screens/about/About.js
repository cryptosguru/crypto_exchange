import React, { PureComponent } from 'react';
import styled from "styled-components";
import RouteWrapper from '../../shared/components/routeWrapper/RouteWrapper';
import { AboutContainer } from './components/AboutContainer/AboutContainer';


const AboutContent = styled.div`
    width: 100%;    
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
`

export class About extends PureComponent {
    render() {
        return (
            <RouteWrapper>
                <AboutContent>
                    <AboutContainer title="About"/>
                </AboutContent>
            </RouteWrapper>
        )
    }
}