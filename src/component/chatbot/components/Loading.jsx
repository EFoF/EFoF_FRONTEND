import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';
import React from 'react'
import loading from '../assets/loading.gif';
export default function Loading() {
  return (
    
    <Load src={loading}/>
    
  )
}
const Load = styled.img`
width: 4rem;
height: 3rem;
    background-color: #f8f9fa;
/* padding: 0.5rem 1.1rem;*/
margin-top : -3.5rem; 
`;

