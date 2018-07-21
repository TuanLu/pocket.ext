// @flow
import {compose, applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {MainStore} from 'redux-ext';

import {reducers} from './reducers/index.js';
import {STORE_NAME, CACHE_NAME} from "../constants.js";
import {webext} from "../utils"

webext.storage.sync.get(CACHE_NAME, (value: Object) => {
    let _store, loggerMiddleware = createLogger();
    if (process.env.ENV !== 'production') {
        _store = createStore(reducers, value[CACHE_NAME], compose(applyMiddleware(loggerMiddleware)));
    } else {
        _store = createStore(reducers, value[CACHE_NAME], compose(applyMiddleware(loggerMiddleware)));
    }

    let store = new MainStore(_store, STORE_NAME);
    store.subscribe(() => webext.storage.sync.set(CACHE_NAME, JSON.stringify(store.getState())));
    process.env.ENV && (window.store = store);
});
