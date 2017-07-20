import styled from 'styled-components';


const TransactionData = styled.div`
  height: 100%;
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;

  .description {
    max-width: 120px;
    font-size: 14px;
  }

  .note {
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
    margin-left: auto;
  }

  .emoji-wrapper {
    
    margin-right: 9px;
    margin-left: 6px;
    display: flex;
    align-items: center;
  }    
 
  .price {
    min-width: 60px;
    text-align: right;
    font-size: 13px;
  }

  @media (min-width: 450px) {

    .description {
      max-width: none;
    }

    .note {
      font-size: 16px;
    }

    .price {
      min-width: 80px;
      font-size: 16px;
    }

    .emoji-wrapper {
       margin-right: 20px;
    }
  }
`;

export default TransactionData;