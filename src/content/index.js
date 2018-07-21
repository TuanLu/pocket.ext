// @flow
import React from "react";
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import {ProxyStore} from 'redux-ext';

import {STORE_NAME} from '../constants.js';

import ShadowDOM from 'react-shadow';

if (window.top === window) {
    window.store = new ProxyStore(STORE_NAME);
    window.store.ready().then(() => {
        (function init() {
            if (document.getElementsByTagName('body').length < 1) {
                setTimeout(init, 100);
            } else {

                // let div = document.createElement('div');
                //
                // document.getElementsByTagName('body')[0].append(div);
                //
                // render((<span>Hello</span>), div);
            }
        })();
        process.env.ENV !== 'production' && (window.store = store);
    });
}
