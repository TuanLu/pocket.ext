// @flow
import {compose, applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {MainStore} from 'redux-ext';
import merge from 'lodash/merge'

import {reducers} from './reducers/index.js';
import {STORE_NAME, CACHE_NAME, MENU_ID} from "../constants.js";
import {webext, validateJson} from "../utils"

webext.storage.local.get(CACHE_NAME, (value: Object) => {
    let _store,
        loggerMiddleware = createLogger(),
        valid = validateJson(value[CACHE_NAME]),
        cache = valid ? JSON.parse(value[CACHE_NAME]) : {};

    if (process.env.ENV !== 'production') {
        _store = createStore(reducers, cache, compose(applyMiddleware(loggerMiddleware)));
    } else {
        _store = createStore(reducers, cache);
    }

    let store = new MainStore(_store, STORE_NAME);
    process.env.ENV && (window.store = store);

    store.subscribe(() => webext.storage.local.set({[CACHE_NAME]: JSON.stringify(store.getState())}));

    webext.contextMenus.create({
        id: MENU_ID,
        title: webext.i18n.getMessage("addToPocket"),
        contexts: ["all"],
        onclick: (info: Object) => {
            store.dispatch({type: "ADD_TO_POCKET", info});
        }
    }, () => {
        let err = webext.runtime.lastError;
        err && console.error(err);
    })
});
