// @flow
import * as React from "react";
import {render} from 'react-dom'
import {Provider} from "react-redux";
import {ProxyStore} from 'redux-ext';

import {STORE_NAME} from '../constants.js';

let store = new ProxyStore(STORE_NAME);

store.ready().then(() => {
    (function init() {
        let container = document.querySelector('.container');
        if (!container) {
            setTimeout(init, 100);
        } else if (container) {
            //
            render((
                <Provider store={store}>
                    <span>Hello Options</span>
                </Provider>
            ), container);
        }
    })();
});
