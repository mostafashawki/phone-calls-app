import styled from 'styled-components';

const TableWrapper = styled.table`
background-color: white;
font-family: 'Exo';
width: 100%;
max-width: 320px;
padding: 20px;
color: black;
text-align: center;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
margin-top: 10px;
    p{
        font-size: 30px;
        margin: 0px;
        cursor: pointer;
    }
    small{
        font-size: 10px;
        margin: 0px;
        vertical-align: top;
    }
     td:active{
        background-color: #e6e6e6;
    }
    
     .button-call{
       
        display: inline-block;
        border-radius: 60px;
        border:0px;
        padding: 0.5em 0.6em;
        background-color: #66bb6a;
        font-size: 20px;
        cursor: pointer;   
    }
    
     .button-call:hover{
        background-color: #81c784;
    }
    
     .first-last{
        font-size: 15px;
        margin: 0px;
        vertical-align: middle;
        cursor: pointer;
    }
    
    
    #output{
        font-size: 20px;
    }
`;

export default TableWrapper;