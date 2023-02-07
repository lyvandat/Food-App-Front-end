import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

import { createUser, fetchUsers } from "../../api";

const STATUS = {
  BAN: -1,
  NORMAL: 1,
  ANONYOUS: 0,
};

const TYPE = {
  NORMAL_USER: 0,
  ADMIN: 1,
  SELLER: -1,
};

function Register(props) {
  const [accounts, setAccounts] = useState([]);
  const [register_error, setRegisterError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then((accounts) => {
        setAccounts(accounts.data);
      })
      .catch(console.error());
  }, []);

  // Methods
  const redirectLogin = () => {
    navigate("/login");
  };
  const register = () => {
    let input_list = {
      usn_input: $("#usn"),
      psw_input: $("#psw"),
      cmtpsw_input: $("#cmtpsw"),
    };
    let valid = true;

    // Check if inputs is empty
    for (const [input_key, input] of Object.entries(input_list)) {
      if (!is_validate(input)) {
        showValidate(input);
        valid = false;
      }
    }

    // Check if password does not match
    if (valid) {
      if (
        $(input_list.psw_input).val().trim() !==
        $(input_list.cmtpsw_input).val().trim()
      ) {
        setRegisterError("Commit password does not match");
        valid = false;
      } else {
        for (const account of accounts) {
          if ($(input_list.usn_input).val().trim() === account.usn) {
            setRegisterError("This username is exist");
            valid = false;
            break;
          }
        }
      }
    }

    // If all requirements is meet, then upload account to database and show noti
    if (valid) {
      createUser({
        usn: input_list.usn_input.val(),
        psw: input_list.psw_input.val(),
        status: STATUS.NORMAL,
        type: TYPE.NORMAL_USER,
      });
    }
    return valid;
  };

  const is_validate = (input) => {
    if ($(input).val().trim().length === 0) return false;
    return true;
  };

  const showValidate = (input) => {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass("alert-validate");
  };

  const hideValidate = (input_class) => {
    let input = $(input_class);
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass("alert-validate");
  };

  return (
    <React.Fragment>
      <div className="container-login">
        <div className="wrap-login scale-fade-in-normal-animation">
          <span className="login-form-title">BE A MEMBER IN A FEW STEP!</span>
          <form className="login-form validate-form pb-4 mt-4">
            <div
              className="wrap-input validate-input"
              data-validate="Enter username"
            >
              <input
                className="input-lgin"
                type="text"
                id="usn"
                placeholder="User name"
                onFocus={() => hideValidate("#usn")}
              />
              <span className="focus-input" data-placeholder="&#xe82a;"></span>
            </div>

            <div
              className="wrap-input validate-input"
              data-validate="Enter password"
            >
              <input
                className="input-lgin"
                type="password"
                id="psw"
                placeholder="Password"
                onFocus={() => hideValidate("#psw")}
              />
              <span className="focus-input" data-placeholder="&#xe80f;"></span>
            </div>

            <div
              className="wrap-input validate-input"
              data-validate="Enter commit password"
            >
              <input
                className="input-lgin"
                type="password"
                id="cmtpsw"
                placeholder="Commit password"
                onFocus={() => hideValidate("#cmtpsw")}
              />
              <span className="focus-input" data-placeholder="&#xe80f;"></span>
            </div>

            <div className="d-flex justify-content-center pt-3">
              <p className="text-red me-title" id="login-fail">
                {register_error}
              </p>
            </div>

            <div className="w-100 d-flex justify-content-center align-items-center pt-3 pb-3">
              <button
                className="login-form-btn"
                type="button"
                onClick={() => register()}
              >
                REGISTER
              </button>

              <p className="ps-3 pe-3">Or</p>

              <button
                className="login-form-btn"
                type="button"
                onClick={() => redirectLogin()}
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="success" className="overlay">
        <div className="popup">
          <div className="content">
            <p className="xlg-title text-center pb-4">Register successfully!</p>
            <p className="lg-title wrap-text text-justify">
              Welcome you to Sunrise Continent. We hope that you will have a
              wonderful experience with us.
            </p>
            <div className="text-center pt-4">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <span className="me-title">GO TO LOGIN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
