import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithJwt, fetchUsers } from "../../api";

import $ from "jquery";

function Login(props) {
  let navigate = useNavigate();
  const [error_login, setError_login] = useState("");

  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    fetchUsers()
      .then((users) => {
        setAccounts(users.data);
      })
      .catch(console.error());
  }, []);

  // Methods
  function is_validate(input) {
    if ($(input).val().trim().length === 0) return false;
    return true;
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input_class) {
    let input = $(input_class);
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass("alert-validate");
  }
  function redirectRegister() {
    navigate("/register");
  }
  function login() {
    let input_list = {
      usn_input: $("#usn"),
      psw_input: $("#psw"),
    };
    let valid = true;

    // Check if inputs is empty
    for (const [input_key, input] of Object.entries(input_list)) {
      if (!is_validate(input)) {
        showValidate(input);
        valid = false;
      }
    }

    // If inputs is not empty, then check valid login
    if (valid) {
      // If
      let is_exist = false;

      for (const account of accounts) {
        if ($(input_list.usn_input).val().trim() === account.usn) {
          is_exist = true;
          if ($(input_list.psw_input).val().trim() === account.psw) {
            if (account.status !== 1) {
              return alert("tài khoản của bạn đã bị khóa");
            }
            // Call callback
            props.setAccount(
              account._id,
              account.usn,
              account.psw,
              account.status,
              account.type
            );

            loginWithJwt(account);

            // Redirect if valid

            navigate("/");
            break;
          } else {
            setError_login("Username or Password is incorrect");
            valid = false;
            break;
          }
        }
      }
      // If username is not exist
      if (!is_exist) {
        setError_login("Username or Password is incorrect");
        valid = false;
      }
    }
    return valid;
  }

  return (
    <div className="container-login">
      <div className="wrap-login scale-fade-in-normal-animation">
        <span className="login-form-title">
          WELCOME TO
          <br />
          SUNRISE CONTINENT
        </span>
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

          <div className="d-flex justify-content-center pt-3">
            <p className="text-red me-title" id="login-fail">
              {error_login}
            </p>
          </div>

          <div className="w-100 d-flex justify-content-center align-items-center pt-3 pb-3">
            <button
              className="login-form-btn"
              type="button"
              onClick={() => login()}
            >
              LOGIN
            </button>

            <p className="ps-3 pe-3">Or</p>

            <button
              className="login-form-btn"
              type="button"
              onClick={() => redirectRegister()}
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
