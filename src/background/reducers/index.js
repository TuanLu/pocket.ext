// @flow
import {combineReducers} from 'redux';

import lastAction from './lastAction';
import pocket from './pocket';

export const reducers = combineReducers({
    lastAction,
    pocket,
});
