// @flow
import React from "react";
import {render} from 'react-dom'
import {Provider} from "react-redux";
import {ProxyStore} from 'redux-ext';
import {MuiThemeProvider} from '@material-ui/core/styles';

import MainApp from './app'
import {STORE_NAME} from '../constants.js';
import theme from '../theme';

let store = new ProxyStore(STORE_NAME);

store.ready().then(() => {
    (function init() {
        let container = document.getElementById('root');
        if (!container) {
            setTimeout(init, 100);
        } else if (container) {
            //
            render((
                <Provider store={store}>
                    <MuiThemeProvider theme={theme}>
                        <MainApp/>
                    </MuiThemeProvider>
                </Provider>
            ), container);
        }
    })();
    process.env.ENV !== 'production' && (window.store = store);
});


