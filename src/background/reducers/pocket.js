// @flow
import merge from 'lodash/merge'
import pick from 'lodash/pick'

import {makeId, elipse} from '../../utils'

function lastAction(state: ?Array = [], action: Object) {
    let _state = [];
    switch (action.type) {
        case "ADD_TO_POCKET":
            let {info} = action;
            return [merge(pick(info, ["linkUrl", "mediaType", "pageUrl", "srcUrl"]), {
                id: makeId(),
                added: +new Date(),
                tags: [],
                name: info.srcUrl || info.linkUrl || info.pageUrl
            }), ...state];
        case "EDIT_IN_POCKET":
            for (let item of state) {
                if (item.id === action.info.id) {
                    item = merge(item, action.info)
                }
                _state.push(item);
            }
            return _state;
        case "REMOVE_FROM_POCKET":
            for (let item of state) {
                if (item.id !== action.id) {
                    _state.push(item);
                }
            }
            return _state;
        default:
            return [...state];
    }
}

export default lastAction;
