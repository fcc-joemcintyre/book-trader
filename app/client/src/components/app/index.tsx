import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { App } from './App';

const container = document.getElementById ('app') as HTMLElement;
const root = createRoot (container);
root.render (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
