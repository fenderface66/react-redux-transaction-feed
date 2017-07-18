import { shallow, mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';

import transactionListItem from 'containers/transactionListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import TransactionsList from '../index';

describe('<TransactionsList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <TransactionsList loading />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <TransactionsList
          loading={false}
          error={{ message: 'Loading failed!' }}
        />
      </IntlProvider>
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the repositories if loading was successful', () => {
    const repos = [{
      owner: {
        login: 'mxstbr',
      },
      html_url: 'https://github.com/react-boilerplate/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'react-boilerplate/react-boilerplate',
    }];
    const renderedComponent = shallow(
      <TransactionsList
        repos={repos}
        error={false}
      />
    );

    expect(renderedComponent.contains(<List items={repos} component={transactionListItem} />)).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <TransactionsList
        repos={false}
        error={false}
        loading={false}
      />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
