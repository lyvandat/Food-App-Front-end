import React from "react";
import {Link} from 'react-router-dom'

import sunrise_logo from '../../assets/images/logo/SunriseFoods-logo.png'
import flavorofindia_logo from '../../assets/images/logo/FlavourOfIndia-logo.png'
import panzerhot_logo from '../../assets/images/logo/PanzerHot-logo.png'
import friggitoria_logo from '../../assets/images/logo/Friggitoria-logo.png'

import qiqifallen_icon from '../../assets/images/icons/qiqi-fallen-emptynoti.png'

export default class NotifyDropdown extends React.Component {

    state = {
        notifications: [
            {key: 'notisunrise1', img: sunrise_logo, name: 'Sunrise Foods', content: 'Order some delicious meal today! We have some voucher for you', time: '3 hours ago'},
            {key: 'notiflavorofindia1', img: flavorofindia_logo, name: 'Friggitoria', content: 'Have a breakfast with us?', time: 'A day ago'},
            {key: 'notipanzerhot1', img: panzerhot_logo, name: 'Panzer Hot', content: 'Lots of food coupons are waiting for you!', time: ' December 13'},
            {key: 'notifriggitoria1', img: friggitoria_logo, name: 'Flavour of India', content: 'Try our new ice meat recipes!', time: 'December 7'},
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
            return (<span className="noti-number">{count}</span>)
        else 
            return (<></>)
    }

    renderNotiElement() {
        let renderNoti = this.state.notifications.map((notidata, index) => {
            return (
                <div className='noti' key={index}>
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
        if(renderNoti.length === 0) {
            return (
                <div className='notify-dropdown-content h-auto'>
                    <p className='me-title pb-2'>THÔNG BÁO</p>
                    <hr className='mt-0'/>
                    <div className='row'>
                        <img src={qiqifallen_icon} className='img-fluid' alt='qiqi'/>
                    </div>
                </div>
            )
        }
        else return (
            <div className='notify-dropdown-content'>
                <div className='d-flex justify-content-center d-inline-block align-items-center pb-4'>
                    <p className='me-title'>THÔNG BÁO</p>
                    <button 
                        className='ms-auto me-title erase-underline emptyBtn text-indigo'
                    >
                        Đánh dấu tất cả đã đọc
                    </button>
                </div>
                <div className='notifield'>
                    {renderNoti}
                </div>
                <hr className='mb-1'/>
                <div className='d-flex justify-content-center align-items-center mt-1'>
                    <Link className='me-title text-indigo erase-underline' to="#" >Xem tất cả</Link>
                </div>
            </div>
        );
    }
    
    render() {
        return (
            <>
                <li className="nav-item notify-dropdown">
                    <button className="nav-link dropdown-btn-wrapper">
                        {this.numOfNoti(this.state.notifications.length)}
                        <i className="bi bi-bell" id="navbar-icon-with-text"></i>
                        Thông báo
                    </button>
                    {this.renderNotiElement()}
                </li>
            </>
        )
    }
}