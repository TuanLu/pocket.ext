// @flow
import merge from 'lodash/merge'
import pick from 'lodash/pick'

import {makeId, elipse} from '../../utils'

function lastAction(state: ?Array = [], action: Object) {
    switch (action.type) {
        case "ADD_TO_POCKET":
            let {info} = action;
            return [merge(pick(info, ["linkUrl", "mediaType", "pageUrl", "srcUrl"]), {
                id: makeId(),
                added: +new Date(),
                tags: []
            }), ...state];
        case
        "REMOVE_FROM_POCKET":
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
