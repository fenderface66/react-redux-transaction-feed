import React from 'react';
import { shallow, render } from 'enzyme';

import TransactionLink from '../TransactionLink';

describe('<TransactionLink />', () => {
  it('should render an <a> tag', () => {
    const renderedComponent = render(<TransactionLink />);
    expect(renderedComponent.find('a').length).toEqual(1);
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<TransactionLink />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<TransactionLink id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<TransactionLink attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
