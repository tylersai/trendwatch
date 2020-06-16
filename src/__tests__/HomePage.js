import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../components/pages/HomePage';

it('HomePage renders without crashing', () => {
  // shadow rendering
  shallow(<HomePage />);
});

it('HomePage has title', () => {
  // shadow rendering
  const wrapper = shallow(<HomePage />);
  const title = <h1 className="text-center">Discover New Movies</h1>;
  expect(wrapper.contains(title)).toBe(true);
});

