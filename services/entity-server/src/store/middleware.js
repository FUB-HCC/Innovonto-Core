export const logger = store => next => action => {
  console.groupCollapsed(action.type ? action.type : "ASYNC ACTION");
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export const thunk = store => next => action =>
  typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);
