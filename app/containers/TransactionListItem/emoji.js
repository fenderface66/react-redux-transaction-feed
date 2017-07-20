import styled from 'styled-components';

console.log(styled.span);

const Emoji = styled.span`
  font-size: 26px;
  margin-left: 5px;
  cursor:pointer;
  @media (min-width: 450px) {
    min-wdith: 50px;
    font-size: 30px;
  }
`;
 
export default Emoji;