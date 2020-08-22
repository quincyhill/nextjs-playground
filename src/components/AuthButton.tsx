import React from "react";
import { store } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../actions";

function AuthButton() {
  const isLogged = useSelector((state: { isLogged: number }) => state.isLogged);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {isLogged ? (
        <button
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            dispatch(login());
          }}
        >
          Login
        </button>
      )}
    </React.Fragment>
  );
}

export default AuthButton;
