import styled from 'styled-components';
import A from 'components/A';

const RequestEmotion = styled(A)`
  font-size: 12px;
  margin-left: 6px;
  text-decoration: underline;
  @media (min-width: 450px) {
    font-size: 16px;
  }
`;
 
export default RequestEmotion;