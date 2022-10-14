const logger = (reducer) => {
  return (prevState, action) => {
    console.group(action.type);
    console.log(">>>Check prev state: ", prevState);
    console.log(">>>Check action: ", action);

    const nextState = reducer(prevState, action);

    console.log(">>>Check next state: ", nextState);

    console.groupEnd();
    return nextState;
  };
};

export default logger;
