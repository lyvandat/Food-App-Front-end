import React from 'react';
import $ from 'jquery'
import { useNavigate, Link } from 'react-router-dom';

import NotifyDropdown from './NotifyDropdown'

import sunrise_logo from '../../assets/images/logo/SunriseFoods-logo.png'

function Header(props) {
    const navigate = useNavigate();
    const searchProcess = () => {
        const key = $('#search-box').val().trim();
        if(key !== '') {
            props.callbackSetKey(key);
            navigate("/products");
        }
    }

    const handleKeydown = (event) => {
        if(event.key === 'Enter') {
            const key = $('#search-box').val().trim();
            if(key !== '') {
                props.callbackSetKey(key);
                navigate("/products");
            }
        }
    }
    const chooseMenu = (k) => {
        props.callbackSetKey(k);
        navigate("/products");
    }

    return (
        <>
            <header className="header" id="header">
                <div className="navbar navbar-expand pt-0 pb-0 header-bar-color">
                    <div className="container p-0">
                        <div className="collapse navbar-collapse">
                            {/* {{! Left links field }} */}
                            <ul className="navbar-nav me-auto" id="nav-leftlink">
                                <li className="nav-item">
                                    <Link className="nav-link active navbar-font-link pb-2 m-0" to="/login">Trở thành người bán hàng</Link>
                                </li>

                                <li className="nav-item"><p
                                    className="nav-link disabled navbar-font-link pb-2 m-0">|</p></li>

                                <li className="nav-item">
                                    <Link className="nav-link active navbar-font-link pb-2 m-0" to="#">Hỗ trợ</Link>
                                </li>

                                <li className="nav-item"><p
                                    className="nav-link disabled navbar-font-link pb-2 m-0"
                                    >|</p></li>

                                <li clas="nav-item">
                                    <Link
                                        to="http://www.facebook.com/MinMinPD2211"
                                        className="nav-link active navbar-icon pb-2 m-0"
                                    >
                                        <i className="bi bi-facebook"></i>
                                    </Link>
                                </li>
                                <li clas="nav-item">
                                    <Link to="https://twitter.com/PHAN_DUONG_MINH" className="nav-link active navbar-icon pb-2 m-0">
                                        <i className="bi bi-twitter"></i>
                                    </Link>
                                </li>
                            </ul>
                            {/* {{! Menu button when < 768px }} */}
                            <ul className="navbar-nav me-auto" id="nav-menubutton">
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link active dropdown-toggle nav-dropdown-font"
                                        to="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-list navbar-menuicon"></i>
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li className="nav-item">
                                            <Link className="dropdown-item" to="/seller">Trở thành người bán hàng</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="dropdown-item" to="#">Hỗ trợ</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            {/* {{! Right links field }} */}
                            <ul className="navbar-nav ml-0">
                                
                                {/* Render a notification dropdown type nav-item */}
                                <NotifyDropdown/>

                                <li className="nav-item dropdown pe-2">
                                    <p
                                        className="nav-link active nav-dropdown-font"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-globe"></i> Ngôn ngữ 
                                    </p>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li>
                                            <Link className="dropdown-item" to="/">Tiếng Việt</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link active navbar-font-link pb-2 m-0" to="/register">Đăng ký</Link>
                                </li>

                                <li className="nav-item"><p
                                    className="nav-link disabled navbar-font-link pb-2 m-0">|</p></li>

                                <li className="nav-item">
                                    <Link className="nav-link active navbar-font-link pb-2 m-0" to="/login">Đăng nhập</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-expand p-0 header-background">
                    <div className="container pt-4">
                        <div className="row w-100 m-0">
                            <div className="collapse navbar-collapse">
                            <div className="col-3">
                                <Link className="navbar-brand pb-0" to="/">
                                <figure className="figure mb-0">
                                    <img
                                    src={sunrise_logo}
                                    className="figure-img img-fluid rounded"
                                    alt="SF logo"
                                    id="logo"
                                    />
                                </figure>
                                </Link>
                            </div>
                            <div className="col-8">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control search-box"
                                        id="search-box"
                                        placeholder="Cùng tìm kiếm vài món ăn ngon nào!"
                                        onKeyDown={(e) => handleKeydown(e)}
                                    />
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        id="search-button" 
                                        onClick={() => searchProcess()}
                                    >
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                                <div className="mt-2" id="hrz-menu">
                                    <button className="emptyBtn nav-menu-font" onClick={() => chooseMenu('Cơm')}>Cơm</button>
                                    <button className="emptyBtn nav-menu-font" onClick={() => chooseMenu('Phở')}>Phở</button>
                                    <button className="emptyBtn nav-menu-font" onClick={() => chooseMenu('Đồ ăn vặt')}>Đồ ăn vặt</button>
                                    <button className="emptyBtn nav-menu-font" onClick={() => chooseMenu('Trà sữa')}>Trà sữa</button>
                                    <button className="emptyBtn nav-menu-font" onClick={() => chooseMenu('Bún đậu mắm tôm')}>Bún đậu mắm tôm</button>
                                </div>
                            </div>
                            <div className="col d-flex justify-content-end" id="cart">
                                <Link to="/login">
                                    <i className="bi bi-cart cart-icon"></i>
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;