import styled from 'styled-components';

const Wrapper = styled.li`
  width: 100%;
  height: 3em;
  display: none;
  align-items: center;
  position: relative;
  border-top: 1px solid #eee;
  &.open {
    display: flex;
  }
  &:first-child {
    border-top: none;
  }
  &:last-child {
    padding-bottom: 80px;
    height: auto;
  }
`;

export default Wrapper;
