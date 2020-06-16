import React from 'react';
import { shallow } from 'enzyme';
import Popularity from '../components/ui/Popularity';

it('Popularity renders without crashing', () => {
  // shadow rendering
  shallow(<Popularity>22</Popularity>);
});

it('Popularity renders even no children is passed as prop', () => {
  // shadow rendering
  shallow(<Popularity></Popularity>);
});

it('Popularity renders even null is passed as prop', () => {
  // shadow rendering
  shallow(<Popularity>{null}</Popularity>);
});

it('Popularity renders even undefined is passed as prop', () => {
  // shadow rendering
  shallow(<Popularity>{undefined}</Popularity>);
});
