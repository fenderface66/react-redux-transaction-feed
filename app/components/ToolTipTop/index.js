/**
 * Tooltip arrow at the top of elements
 */

import styled from 'styled-components';

const ToolTipTop = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 15px;
  border-color: transparent transparent #f4f4f4 transparent;
  position: absolute;
  top: -15px;
  left: 50%;   
  transform: translateX(-50%);       
`;

export default ToolTipTop;



