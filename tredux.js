class store {
  constructor(reducer) {
    this.state = reducer(undefined, {});
    this.listener = [];
  }

  //get current state
  getState() {
    return this.state;
  }

  //dispatch an action
  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listener.forEach((listener) => listener());
  }

  //sub to state changes
  subscribe(listener) {
    this.listeners.push(listener);
  }

  //set reducer
  setReducer(reducer) {
    this.reducer = reducer;
  }
}

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

//Define Reducer

function tallyReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
}

const store = new store(tallyReducer);

store.subscribe(() => {
  console.log("State updated:", store.getState());
});

store.dispatch({ type: INCREMENT });
store.dispatch({ type: INCREMENT });
store.dispatch({ type: DECREMENT });
store.dispatch({ type: RESET });
