// @flow
import merge from 'lodash/merge'
import pick from 'lodash/pick'

import {makeId} from '../../utils'

function lastAction(state: ?Array = [], action: Object) {
    switch (action.type) {
        case "ADD_TO_POCKET":
            return [...state, merge(pick(action.info, ["linkUrl", "mediaType", "pageUrl", "srcUrl"]), {
                id: makeId(),
                added: +new Date()
            })];
        case "REMOVE_FROM_POCKET":
            let _state = [];
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
