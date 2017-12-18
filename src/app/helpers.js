// @flow

export function actionCreator<T>(type: string) {
  return function (payload: T) {
    return { type, payload };
  };
}

export function reducer<T>(initialState: T, handlers: { [key: string]: (state: T, action: any) => T }) {
  return function reducer(state: T = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}