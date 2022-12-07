import React, {useState} from "react";
import * as sessionActions from '../../store/session';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import "./DemoUser.css"


function DemoUserButton() {
    const history = useHistory();
    const dispatch = useDispatch();

    const demoLogIn = (e) => {
      e.preventDefault();

      dispatch(sessionActions.demoLogIn())
      history.push("/");
    }

        return (
            <button className="demo-log-in" onClick={demoLogIn}>
          Demo Login
        </button>
          );


  }

  export default DemoUserButton;
