import styled from 'styled-components';


const EmotionBarStyle = styled.div`
  position: absolute;
  top: 105%;
  right: 32px;
  z-index: 9;
  background-color: #DDDDDD;
  border-radius: 2px;

  ul {
    display: flex;
    justify-content: space-between;
    padding: 6px 6px;
  }

  li {
    margin: 0 6px;
    font-size: 24px;
    cursor: pointer;
    backface-visibility: hidden;
    transition: .4s;
    -webkit-font-smoothing: subpixel-antialiased;
    &:hover {
      transform: scale(1.1) rotate(360deg);
    }
  }

`;

export default EmotionBarStyle;