import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar>
        </NavBar>
      </div>
    );
  }
}

export default Header;
