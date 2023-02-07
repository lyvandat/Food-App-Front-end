
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'

import { createUser, fetchUsers } from "../../api";

const STATUS = {
    BAN: -1,
    NORMAL: 1,
    ANONYOUS: 0
}

const TYPE = {
    NORMAL_USER: 0,
    ADMIN: 1,
    SELLER: -1
}

function SellerRegister(props) {
    const [accounts, setAccounts] = useState([]);
    const [register_error, setRegisterError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers()
            .then((accounts) => {
                setAccounts(accounts.data);
            })
            .catch(console.error());
    }, [])

    // Methods
    const redirectHome = () => {
        navigate("/");
    }
    const register = () => {
        let input_list = {
            ucn_input: $('#ucn'),
            uaddr_input: $('#uaddr'),
            uct_input: $('#uct'),
            ubn_input: $('#ubn')
        }
        let valid = true;
        
        // Check if inputs is empty
        for(const [input_key, input] of Object.entries(input_list)) {
            if(!is_validate(input)) {
                showValidate(input);
                valid = false;
            }   
        }

        
        // If all requirements is meet, then upload account to database and show noti
        if(valid) {

            createUser({
                //usn: input_list.usn_input.val(),
                //psw: input_list.psw_input.val(),
                ucn: input_list.ucn_input.val(),
                uaddr: input_list.uaddr_input.val(),
                uct: input_list.uct_input.val(),
                ubn: input_list.ubn_input.val(),
                status: STATUS.NORMAL,
                type: TYPE.SELLER,
            })
            window.location.href = "#success";
        }
        return valid;
    }
    
    const is_validate = (input) => {
        if($(input).val().trim().length === 0)
            return false;
        return true;
    }
    
    const showValidate = (input) => {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }
    
    const hideValidate = (input_class) => {
        let input = $(input_class)
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    } 

    return (
        <React.Fragment>
            <div className="container-login">
                <div className="wrap-login scale-fade-in-normal-animation">
                    <span className="login-form-title">
                        BE A SELLER IN A FEW STEP!
                    </span>
                    <form className="login-form validate-form pb-4 mt-4">
    
                        <div className="wrap-input validate-input" data-validate = "Your company name">
                            <input 
                                className="input-lgin" 
                                type="text" 
                                id="ucn" 
                                placeholder="Your company name"
                                onFocus={() => hideValidate('#ucn')}
                            />
                            <span className="focus-input" data-placeholder="&#xe82a;"></span>
                        </div>
    
                        <div className="wrap-input validate-input" data-validate="Your address">
                            <input 
                                className="input-lgin" 
                                type="text" 
                                id="uaddr" 
                                placeholder="Address"
                                onFocus={() => hideValidate("#uaddr")}
                            />
                            <span className="focus-input" data-placeholder="&#xe80f;"></span>
                        </div>

                        <div className="wrap-input validate-input" data-validate="Your contact">
                            <input 
                                className="input-lgin" 
                                type="tel" 
                                id="uct" 
                                placeholder="Contact"
                                onFocus={() => hideValidate("#uct")}
                            />
                            <span className="focus-input" data-placeholder="&#xe80f;"></span>
                        </div>
    
                        <div className="wrap-input validate-input" data-validate="Your banner">
                            <input 
                                className="input-lgin" 
                                type="file" 
                                id="ubn" 
                                placeholder="Your banner"
                                onFocus={() => hideValidate("#ubn")}
                            />
                            <span className="focus-input" data-placeholder="&#xe80f;"></span>
                        </div>

                        <div className="d-flex justify-content-center pt-3">
                            <p className="text-red me-title" id="login-fail">{register_error}</p>
                        </div>
    
                        <div className="w-100 d-flex justify-content-center align-items-center pt-3 pb-3">
                            <button className="login-form-btn" type="button" onClick={() => register()}>
                                REGISTER
                            </button>
                            
                            <p className="ps-3 pe-3">Or</p>

                            <button className="login-form-btn" type="button" onClick={() => redirectHome()}>
                                BACK
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="success" className="overlay">
                <div className="popup">
                    <div className="content">
                        <p className="xlg-title text-center pb-4">Register successfully!</p>
                        <p className="lg-title wrap-text text-justify">Welcome you to Sunrise Continent. We hope that you will have a wonderful experience with us.</p>
                        <div className="text-center pt-4">
                            <button className="btn btn-primary" onClick={() => {navigate("/seller")}}>
                                <span className="me-title">GO TO SELLER HOME</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SellerRegister;