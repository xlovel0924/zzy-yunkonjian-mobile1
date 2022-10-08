import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from '@/reducers';
import { HashRouter } from 'react-router-dom';
import '@/config';
import '@/assets/css/index.css';
import "@ant-design/flowchart/dist/index.css";
import Containers from '@/containers/app';

// import VConsole from 'vconsole';
//
// const vConsole = new VConsole();

export const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
));

ReactDom.render(
  (<Provider store={store} >
    <HashRouter>
      <Containers/>
    </HashRouter>
  </Provider>)
  ,document.getElementById('root')
);
