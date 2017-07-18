import styled from 'styled-components';


const TransactionData = styled.div`
  height: 100%;
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  .emoji {
    margin-left: auto;
    margin-right: 20px;
    display: flex;
    align-items: center;
    
  }

  .price {
    min-width: 80px;
    text-align: right;
  }
`;

export default TransactionData;