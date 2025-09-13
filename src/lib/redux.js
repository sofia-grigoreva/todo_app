export const createStore = (reducer) => {
    let state = reducer(undefined, { type: '__INIT__' });
    let subscribers = [];

    return {
        getState: () => state,
        dispatch: action => { 
            state = reducer(state, action);
            subscribers.forEach(cb => cb());
        },
        subscribe: (cb) => subscribers.push(cb),
    };
};

export const combineRedcuers = (reducersMap) => {
    return (state, action) => {
        const nextState = {};

        Object.entries(reducersMap).forEach(([key, reducer]) => {
            nextState[key] = reducer(state ? state[key] : state, action);
        });

        return nextState;
    };
};

const logger = store => dispatch => action => {
    console.log(action.type);
}

const thunk = store => dispatch => action => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return dispatch(action);
};

const applyMiddleware = (middleware) => {
    return (createStore) => {
        return (reducer) => {
            const store = createStore(reducer);
            return {
                dispatch: action => middleware(store)(store.dispatch)(action),
                getState: store.getState,
            }
        }
    }
};