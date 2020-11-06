import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/pages/index';

describe('Hello world', () => {
  it('App shows "Ola mundo" in a <h1> tag', () => {
    const app = shallow(<App />);
    expect(app.find('div').text()).toEqual('Ola mundo');
  });
});
