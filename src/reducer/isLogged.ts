import { SimpleActionInterface } from "./counter";
const loggedReducer = (
  state: boolean = false,
  action: SimpleActionInterface
) => {
  switch (action.type) {
    case "LOG_IN":
      return true;
    case "LOG_OUT":
      return false;
    default:
      return state;
  }
};

export default loggedReducer;
