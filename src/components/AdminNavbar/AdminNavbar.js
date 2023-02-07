
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import $ from 'jquery'

import avt from '../../assets/images/user/avt/002.png'
import logo from '../../assets/images/logo/SunriseFoods-logo.png'

import AdminNotify from './AdminNotify'

const titles = {
    'Menu': ['Dashboard', 'User Center', 'Seller Center'],
    'Manage Page': ['Posts', 'Banners'],
    'Analysis': ['Bussiness Chart']
}

function AdminNavbar() {
    const [breadcum, setBreadcum] = useState("Menu > Dashboard");
    const [pagename, setPagename] = useState("Dashboard")

    // Methods
    const clickTitle = (id, name) => {
        setPagename(name);
        for(let key in titles) {
            titles[key].forEach(element => {
                if(element === name) {
                    setBreadcum(key + ' > ' + name)
                }
            });
        }
        $('.v-nav-item').removeClass('active');
        $(id).addClass('active');
    }

    // Onload select title to active
    React.useEffect (
        () => {
            let cur_link = window.location.href;
            let cur_page_key = cur_link.slice(cur_link.indexOf('/admin') + 7, cur_link.length).split('/')[0]
            const v_navlink = document.querySelectorAll('.v-nav-item');
            if (v_navlink) {
                v_navlink.forEach(nav_item => {
                    if (nav_item.id.indexOf(cur_page_key) !== -1) {
                        nav_item.classList.add('v-nav-active');
                    }
                    else {
                        nav_item.classList.remove('v-nav-active');
                    }
                })
            }
        }
    )

    return (
        <div className="admin-wrapper">
            <div className="v-navbar-field">
                <div className='admin-logo'>
                    <p className='logo-font text-white'>SUNRISE FOODS</p>
                </div>
                <div className='admin-nav-list'>
                    <div className='col d-flex justify-content-center'>
                        <ul className='vertical-navbar'>
                            <li className='v-nav-title'>
                                <p className='sm-title text-white'>Menu</p>
                            </li>
                            <li className='v-nav-item' id='dashboard-title'>
                                <Link 
                                    to='/admin/dashboard' 
                                    className='erase-underline text-white'
                                    onClick={() => clickTitle('#dashboard-title', 'Dashboard')}
                                >
                                    <i className="fa-solid fa-circle-dollar-to-slot pe-3"></i>
                            
                                    Dashboard
                                </Link>
                            </li>
                            <li className='v-nav-item' id='usercenter-title'>
                                <Link 
                                    to='/admin/usercenter' 
                                    className='erase-underline text-white'
                                    onClick={() => clickTitle('#usercenter-title', 'User Center')}
                                >
                                    <i className="fa-solid fa-users pe-3"></i>
                                    User Center
                                </Link>
                            </li>
                            <li className='v-nav-item' id='sellercenter-title'>
                                <Link 
                                    to='/admin/sellercenter' 
                                    className='erase-underline text-white'
                                    onClick={() => clickTitle('#sellercenter-title', 'Seller Center')}
                                >
                                    <i className="fa-solid fa-handshake pe-3"></i>
                                    Seller Center
                                </Link>
                            </li>
                            <li className='v-nav-title'>
                                <p className='sm-title text-white'>Manage Page</p>
                            </li>
                            <li className='v-nav-item' id='posts-title'>
                                <Link 
                                    to='/admin/posts' 
                                    className='erase-underline text-white'
                                    onClick={() => clickTitle('#posts-title', 'Posts')}
                                >
                                    <i className="fa-solid fa-mug-hot pe-3"></i>
                                    Posts
                                </Link>
                            </li>
                            <li className='v-nav-item' id='banners-title'>
                                <Link 
                                    to='/admin/banners' 
                                    className='erase-underline text-white'
                                    onClick={() => clickTitle('#banners-title', 'Banners')}
                                >
                                    <i className="fa-solid fa-rectangle-ad pe-3"></i>
                                    Banners
                                </Link>
                            </li>
                            <li className='v-nav-title'>
                                <p className='sm-title text-white'>Analysis</p>
                            </li>
                            <li className='v-nav-item' id='businesschart-title'>
                                <Link 
                                    to='/admin/bussinesschart' 
                                    className='erase-underline text-white'
                                    onClick={() => clickTitle('#businesschart-title', 'Business Chart')}
                                >
                                    <i className="fa-solid fa-chart-line pe-3"></i>
                                    Business Chart
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="v-navbar-field-instead">
                <div className='admin-logo'>
                    <p className='logo-font text-white'>SFS</p>
                </div>
                <div className='admin-nav-list'>
                    <ul className='vertical-navbar ps-2 pe-2'>
                        <li className='v-nav-title'>
                            <p className='sm-title text-white'>Menu</p>
                        </li>
                        <li className='v-nav-item active' id='dashboard-title'>
                            <Link 
                                to='/admin/dashboard' 
                                className='erase-underline text-white'
                                onClick={() => clickTitle('#dashboard-title', 'Dashboard')}
                            >
                                <i className="fa-solid fa-circle-dollar-to-slot pe-3"></i>
                            </Link>
                        </li>
                        <li className='v-nav-item' id='usercenter-title'>
                            <Link 
                                to='/admin/usercenter' 
                                className='erase-underline text-white'
                                onClick={() => clickTitle('#usercenter-title', 'User Center')}
                            >
                                <i className="fa-solid fa-users pe-3"></i>
                            </Link>
                        </li>
                        <li className='v-nav-item' id='sellercenter-title'>
                            <Link 
                                to='/admin/sellercenter' 
                                className='erase-underline text-white'
                                onClick={() => clickTitle('#sellercenter-title', 'Seller Center')}
                            >
                                <i className="fa-solid fa-handshake pe-3"></i>
                            </Link>
                        </li>
                        <li className='v-nav-title'>
                            <p className='sm-title text-white'>Page</p>
                        </li>
                        <li className='v-nav-item' id='posts-title'>
                            <Link 
                                to='/admin/posts' 
                                className='erase-underline text-white'
                                onClick={() => clickTitle('#posts-title', 'Posts')}
                            >
                                <i className="fa-solid fa-mug-hot pe-3"></i>
                            </Link>
                        </li>
                        <li className='v-nav-item' id='banners-title'>
                            <Link 
                                to='/admin/banners' 
                                className='erase-underline text-white'
                                onClick={() => clickTitle('#banners-title', 'Banners')}
                            >
                                <i className="fa-solid fa-rectangle-ad pe-3"></i>
                            </Link>
                        </li>
                        <li className='v-nav-title'>
                            <p className='sm-title text-white'>Analysis</p>
                        </li>
                        <li className='v-nav-item' id='businesschart-title'>
                            <Link 
                                to='/admin/bussinesschart' 
                                className='erase-underline text-white'
                                onClick={() => clickTitle('#businesschart-title', 'Business Chart')}
                            >
                                <i className="fa-solid fa-chart-line pe-3"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='h-navbar-field'>
                <div className='row bg-white'>
                    <div className='col h-nav-left'>
                        <div className='menu'>
                            <i className="fa-solid fa-bars fa-lg"></i>
                        </div>
                    </div>
                    <div className='col d-flex justify-content-end align-items-center me-4'>
                        <div className="dropdown pe-4 dropstart">
                            <p
                                className="fa-lg"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fa-solid fa-earth-americas"></i>
                            </p>
                            <ul className="dropdown-menu dropdown-menu-light">
                                <li>
                                    <Link className="dropdown-item" to="/">Tiếng Việt</Link>
                                </li>
                            </ul>
                        </div>
                        <AdminNotify/>
                        <div className='avt-box'>
                            <img src={avt} className='admin-avt me-2' alt="avt"/>
                            <span className='formal-font text-me text-thin'>
                                Dương Minh  <br/>
                                <span className='text-sm text-thin'>Founder</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='row bg-white'>
                    <hr className='mb-0'/>
                    <div className='col h-nav-left'>
                        <p>{pagename.toUpperCase()}</p>
                    </div>
                    <div className='col breadcum-field'>
                        <p>{breadcum}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar;