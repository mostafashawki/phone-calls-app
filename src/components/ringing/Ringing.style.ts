import styled from 'styled-components';

const DivWrapper = styled.div`
background-color: white;
font-family: 'Exo';
width: 90%;
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
    
     .button-answer{
       
        display: inline-block;
        border-radius: 60px;
        border:0px;
        padding: 0.5em 0.6em;
        background-color: #66bb6a;
        font-size: 20px;
        cursor: pointer; 
        margin: 20px;  
    }
    
     .button-answer:hover{
        background-color: #81c784;
    }

    .button-reject{
       
        display: inline-block;
        border-radius: 60px;
        border:0px;
        padding: 0.5em 0.6em;
        background-color: #bf0404;
        font-size: 20px;
        cursor: pointer; 
        margin: 20px;    
    }
    
     .button-reject:hover{
        background-color: #bf3030;
    }
    
     
`;

export default DivWrapper;