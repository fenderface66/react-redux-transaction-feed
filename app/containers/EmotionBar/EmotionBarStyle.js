import styled from 'styled-components';


const EmotionBarStyle = styled.div`
  position: absolute;
  top: 100%;
  left: 20px;
  background-color: #DDDDDD;
  border-radius: 2px;

  ul {
    display: flex;
    justify-content: space-between;
    padding: 0px 6px;
  }

  li {
    margin: 0 6px;
  }
`;

export default EmotionBarStyle;