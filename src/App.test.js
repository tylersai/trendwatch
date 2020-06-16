import React from 'react';
import ReactDOM from "react-dom";
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing without enzyme', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders without crashing with enzyme', () => {
  // shadow rendering
  shallow(<App />);
});
