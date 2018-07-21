// @flow
import merge from 'lodash/merge'

function lastAction( state: ?Object = {}, action: Object ) {
	switch (action) {
		default:
			return merge({}, action);
	}
}

export default lastAction;
