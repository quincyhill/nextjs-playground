import counterReducer from "./counter";
import loggedReducer from "./isLogged";
// name for import doesnt matter since they were from default exports

import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
});

export default allReducers;
