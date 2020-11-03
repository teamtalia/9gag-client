import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/pages/index';

describe('Hello world', () => {
  it('App shows "Welcome toNext.js!" in a <h1> tag', () => {
    const app = shallow(<App />);
    expect(app.find('h1').text()).toEqual('Welcome toNext.js!');
  });
});
