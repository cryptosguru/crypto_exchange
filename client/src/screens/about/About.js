import React from 'react';
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

const About = () =>
    <RouteWrapper>
        <AboutContent>
            <AboutContainer title="About"/>
        </AboutContent>
    </RouteWrapper>

export { About }