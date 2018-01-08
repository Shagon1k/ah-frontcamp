export default function createStore(reducer) {
	if (typeof reducer !== 'function') {
		throw new Error ('Reducer provided should be a function');
	}

	let state;
	let listeners = [];

	function getState() {
		return state;
	}

	function dispatch(action) {
		if (typeof action !== 'object' || action === null) {
			throw new Error('Action should be an object (actually plain object :D)')
		}

		if (typeof action.type === 'undefined') {
			throw new Error('Action should have "type" property')
		}

		state = reducer(state, action);
		listeners.forEach(listener => listener());

		return action;
	}

	function subscribe(listener) {
		if (typeof listener !== 'function') {
			throw new Error('Listener provided should be a function');
		}

		let isSubscribed = true;

		listeners.push(listener);
		return () => {
			isSubscribed = false;

			let index = listeners.indexOf(listener);

			listeners.splice(index, 1);
		}
	}

	return {getState, dispatch, subscribe};
}