import React from 'react';
import Content from '../Container';
import styled from 'styled-components';

const Progress = styled.div`  
  margin: auto;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  width: ${({ fullscreen }) => fullscreen ? '3.5rem' : '1.5rem'};
  height: ${({ fullscreen }) => fullscreen ? '3.5rem' : '1.5rem'};
  border: ${({ fullscreen }) => fullscreen ? '0.5rem' : '0.25rem'} solid #F3F3F3;
  border-top: ${({ fullscreen }) => fullscreen ? '0.5rem' : '0.25rem'} solid #3498DB;  

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loader = ({ fullscreen }) => (
  <Content centered style={{ height: fullscreen ? '90vh' : 'auto' }}>
    <Progress fullscreen />
  </Content>
);

export default Loader;