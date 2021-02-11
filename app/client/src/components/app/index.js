import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import { App } from './App';

// initialize store
const store = configureStore ();
render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById ('app'),
);