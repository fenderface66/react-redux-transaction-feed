import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  width: 100%;
  max-height: 30em;
  overflow-y: auto;
  padding: 0 6px;
  @media (min-width: 450px) {
    padding: 0 12px;
  }
`;

export default Ul;
