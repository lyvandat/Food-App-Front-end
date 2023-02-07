import React from "react";
import {Link} from 'react-router-dom'

import sunrise_logo from '../../assets/images/logo/SunriseFoods-logo.png'
import flavorofindia_logo from '../../assets/images/logo/FlavourOfIndia-logo.png'
import panzerhot_logo from '../../assets/images/logo/PanzerHot-logo.png'
import friggitoria_logo from '../../assets/images/logo/Friggitoria-logo.png'

import bell from '../../assets/images/icons/bell.svg'

export default class AdminNotify extends React.Component {

    state = {
        notifications: [
            {key: 'notisunrise1', img: sunrise_logo, name: 'Sunrise Foods', content: 'Order some delicious meal today! We have some voucher for you', time: '3 hours ago'},
            {key: 'notiflavorofindia1', img: flavorofindia_logo, name: 'Friggitoria', content: 'Have a breakfast with us?', time: 'A day ago'},
            {key: 'notipanzerhot1', img: panzerhot_logo, name: 'Panzer Hot', content: 'Lots of food coupons are waiting for you!', time: ' December 13'},
            {key: 'notifriggitoria1', img: friggitoria_logo, name: 'Flavour of India', content: 'Try our new ice meat recipes!', time: 'December 7'},
            {key: 'notisunrise2', img: sunrise_logo, name: 'Sunrise Foods', content: 'Order some delicious meal today! We have some voucher for you', time: '1 year ago'}
        ]
    };

    deleteNoti = (notikey) => {
        let newNotifications = [];
        for(let i = 0; i < this.state.notifications.length; i++) {
            if(notikey !== this.state.notifications[i].key) {
                newNotifications.push(this.state.notifications[i]);
            }
        }
        this.setState({notifications: newNotifications});
    }

    numOfNoti(count) {
        if(count > 0)
            return (<span className="admin-noti-number">{count}</span>)
        else 
            return (<></>)
    }

    renderNotiElement() {
        let renderNoti = this.state.notifications.map((notidata, index) => {
            return (
                <div className='admin-noti' key={index}>
                    <div className='row'>
                        <div className='col-3 m-auto'>
                            <Link to='#'><img src={notidata.img} className='img-fluid' alt='noti'/></Link>
                        </div>
                        <div className='col-8'>
                            <Link to='#' className='erase-underline text-black'>
                                <p className='me-title wrap-text truncate'>{notidata.name} &nbsp;
                                    <span className='sm-title opacity-75'>{notidata.content}</span>
                                </p>
                                <p className='sm-title opacity-75'>{notidata.time}</p>
                            </Link>
                        </div>
                        <div className='col-1 d-flex justify-content-center align-items-center'>
                            <button 
                                className='emptyBtn' 
                                onClick={e => this.deleteNoti(notidata.key)}
                            >
                                    <i className='bi bi-x-lg'></i>
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
        if(renderNoti.length > 4)
            renderNoti.push(
                <div key='seeall'>   
                    <hr className='mb-1'/>
                    <div className='d-flex justify-content-center align-items-center mt-1'>
                        <Link className='me-title text-indigo erase-underline' to="#" >Xem tất cả</Link>
                    </div>
                </div>
            )
        // Empty noti
        if(renderNoti.length === 0) {
            return (
                <div className='admin-dropdown-content'>
                    <div className='admin-notify-header'>
                        <p className='me-title text-white pt-4 ps-3'>NOTIFICATIONS</p>
                        <button 
                            className='markall-btn me-title mt-4'
                        >
                            <i className="fa-solid fa-square-check fa-lg"></i>
                        </button>
                    </div>
                    <div className='admin-notifield text-center pt-5'>
                        <img src={bell} className='bell-img' alt='bell'/>
                        <p className="formal-font text-lg text-bold wrap-text opacity-75 pt-3">
                            Hey! You have no any notifications
                        </p>
                    </div>
                </div>
            )
        }
        else return (
            <div className='admin-dropdown-content'>
                <div className='admin-notify-header'>
                    <p className='me-title text-white pt-4 ps-3'>NOTIFICATIONS</p>
                    <button 
                        className='markall-btn me-title mt-4'
                    >
                        <i className="fa-solid fa-square-check fa-lg"></i>
                    </button>
                </div>
                <div className='admin-notifield'>
                    {renderNoti}
                </div>
            </div>
        );
    }
    
    render() {
        return (
            <>
                <div className="admin-dropdown pe-4">
                    <button className="emptyBtn">
                        <div className="h-nav-icon">
                            {this.numOfNoti(this.state.notifications.length)}
                            <i className="fa-regular fa-bell text-black"></i>
                        </div>
                    </button>
                    {this.renderNotiElement()}
                </div>
            </>
        )
    }
}