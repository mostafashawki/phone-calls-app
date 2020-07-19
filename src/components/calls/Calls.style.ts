import styled from 'styled-components';

const DivWrapper = styled.div`
  margin: 10px auto;
  width:100%;
  background-color:#fff;
  display:grid;
  grid-template-columns: 49% 49%;
  grid-row: auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  .box{
    background-color:#197bc4;
    padding:20px;
    color: white;
    text-align: center;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:sans-serif;
  }
  
  .profile{
    font-size: 20px;
  }
  
  .card{
    width: 320px;
    
  }
  
`;

export default DivWrapper;