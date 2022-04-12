import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Dashboard from './Dashboard';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Dashboard />
  </StyledEngineProvider>,
  document.querySelector('#root')
);
