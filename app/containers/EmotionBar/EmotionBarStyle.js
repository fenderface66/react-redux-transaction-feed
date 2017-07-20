import styled from 'styled-components';


const EmotionBarStyle = styled.div`
  position: absolute;
  top: 110%;
  right: 4px;     
  
  z-index: 9;
  background-color: #f4f4f4;
  border-radius: 2px;
  transform: scale(0);
  transition: .2s;
  &.open {
    transform: scale(1);
  }

  .close-icon {
    vertical-align: middle;
    position: absolute;
    right: -7px;
    top: -7px;
    cursor: pointer;
    font-size: 17px;
  }

  ul {
    display: flex;
    justify-content: space-between;
    padding: 6px 6px 3px 6px;
  }

  li {
    margin: 0 6px;
    font-size: 24px;
    cursor: pointer;
    backface-visibility: hidden;
    transition: .3s;
    -webkit-font-smoothing: subpixel-antialiased;
    display:flex;
    align-items: center;
    &:hover {
      transform: scale(1.15);
    }
  }

  .remove {
    font-size: 12px;
    text-decoration: underline;
    display:block;
    width: 100%;
    text-align: center;
    cursor:pointer;
    padding-bottom: 6px;
  }
  @media (min-width: 450px) {
    right: 37px;
  }

`;

export default EmotionBarStyle;