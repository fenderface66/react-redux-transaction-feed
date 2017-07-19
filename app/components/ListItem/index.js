import React from 'react';

import Item from './Item';
import Wrapper from './Wrapper';

function ListItem(props) {
  
  
  return (
    <Wrapper className={props.showClass}>
      <Item>
        {props.item}
      </Item>
    </Wrapper>
  );
}

ListItem.propTypes = {
  item: React.PropTypes.any,
  filteredItems: React.PropTypes.array,
};

export default ListItem;
