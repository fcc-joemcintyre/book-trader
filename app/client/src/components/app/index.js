import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { App } from './App';

// initialize store
render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById ('app'),
);
