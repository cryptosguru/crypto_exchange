import React from "react";
import styled from "styled-components";
import { GitHubLink } from '../GithubLink/GitHubLink';

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  box-shadow: 0px 0px 38px -3px rgba(0,0,0,0.49);
  height: 500px;
  width: 400px;
`

const Description = styled.p`
  padding: 20px;
  text-align: center;
`

const AboutContainer = ({ title }) =>
    <AboutWrapper>
      <h3>{title}</h3>
      <Description>
        This was a simple project to test development with <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React</a> 
        ,<a target="_blank" rel="noopener noreferrer" href="https://ant.design/"> Ant Design </a> and 
        <a rel="noopener noreferrer" target="_blank" href="https://nodejs.org/en/"> NodeJs</a>. 
        It consists in a simple project to help with news about cryptocurrencies, last days history,
        exchanges that trade a given cryptocurrency, and wallets with their level of requeriments and facility
        to use.
      </Description>
      <GitHubLink/>
    </AboutWrapper>

export { AboutContainer }
