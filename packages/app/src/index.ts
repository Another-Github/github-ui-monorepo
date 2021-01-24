import { StrictMode, createElement } from 'react';
import { render } from 'react-dom';
import Explorer from './Explorer';

render(
  createElement(StrictMode, null, [createElement(Explorer)]),
  document.getElementById('root'),
);
