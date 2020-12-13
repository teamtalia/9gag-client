import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/pages/index';

describe('Render navbar', () => {
  it('App render Navbar', () => {
    const app = shallow(<App />);
    expect(app.find('NavBar').text()).toBe('<NavBar/>');
  });
});
