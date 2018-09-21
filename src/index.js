import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import MainContainer from './containers/MainContainer';

render(<Provider store={store}>
    <BrowserRouter>
        <Route path="/" component={MainContainer} />
    </BrowserRouter>
</Provider>,
    document.getElementById('root'));
//registerServiceWorker();