import styled from 'styled-components';


const NoteContainerStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: scale(0) translateX(-50%) translateY(-50%);
  z-index: 9;
  background-color: #f4f4f4;
  border: solid 1px #c4c4c4;
  border-radius: 2px;
  transition: .2s;
  width: 280px;
  &.open {
    transform: scale(1) translateX(-50%) translateY(-50%);
  }
  .close-icon {
    vertical-align: middle;
    position: absolute;
    right: -7px;
    top: -7px;
    cursor: pointer;
    font-size: 17px;
  }

  p {
    padding: 15px;
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: 0;
    text-align: center;
  }

  @media (min-width: 450px) {
    top: calc(50% + 60px);
    width: 350px;
  }
    

`;

export default NoteContainerStyle;