
import $ from 'jquery'

import RatingStarGenerator from '../RatingStars/RatingStars'
import qiqifallen from '../../assets/images/others/qiqi-fallen.png'
import ban_icon from '../../assets/images/icons/ban.png'
import user2 from '../../assets/images/user/avt/004.jpeg'

import { banUser, unbanUser } from '../../api'
import React from 'react'

function SellerList(props) {
    const sellers = props.seller_list;
    if (!sellers.length) return(<div></div>);

    const moveToBan = (target) => {
        // if ($('#' + target.usn).css("transform") === 'none'){
        //     $('#' + target.usn).css("transform","rotateY(180deg)");
        // }
        $('#' + target.usn).addClass("undisplay");
    }
    const cancelBanSeller = (target) => {
        // if ($('#' + target.usn).css( "transform") !== 'none'){
        //     $('#' + target.usn).css("transform","");
        // }
        $('#' + target.usn).removeClass("undisplay");
    }
    const handleBan = (target, select, input) => {
        let is_valid = false;
        if($(select).val() === 'default') {
            $('.ban-error').text('Require type! Please choose one.')
        }
        else if($(input).val().trim() === '') {
            $('.ban-error').text('Require time! Please fill.')
        }
        else {
            is_valid = true;
        }
        if(is_valid) {
            $('#ban-btn' + target.usn).addClass('undisplay');
            $('#unban-btn' + target.usn).removeClass('undisplay');
            // if ($('#' + target.usn).css( "transform") !== 'none'){
            //     $('#' + target.usn).css("transform","");
            // }
            $('#' + target.usn).removeClass("undisplay");
            // Call API to set status of target to STATUS.BAN
            // and time till unban or never
            banUser(target);
        }
    }
    const handleUnban = (target) => {
        $('#unban-btn' + target.usn).addClass('undisplay');
        $('#ban-btn' + target.usn).removeClass('undisplay');
        // Call API to set status of target to STATUS.NORMAL
        unbanUser(target);
    }
    
    sellers.map((seller, index) => {
        if(seller.status === -1) {
            $('#ban-btn' + seller.usn).addClass('undisplay');
        }
        else {
            $('#unban-btn' + seller.usn).addClass('undisplay');
        }
    })
    
    let sellerlist = sellers.map((seller, index) => {

        return  (
            <div className="col-12 col-sm-6 col-xxl-4 pb-4 d-flex justify-content-center" key={index}>
                <div className="card admin-card">
                    <div className="admin-card-back">
                        <div className='text-center pt-2 pb-4'>
                            <img src={ban_icon} className='ban-icon' alt='ban-icon'/>
                        </div>
                        <select className="form-select mb-2" id={'select-' + seller.usn}>
                            <option value='default'>Select type of ban</option>
                            <option value="day">Day</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                            <option value='permanent'>Permanent</option>
                        </select>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="time">How many?</span>
                            <input 
                                type="number" 
                                min={0} 
                                className="form-control" 
                                aria-describedby="time" 
                                id={'input-' + seller.usn}/>
                        </div>
                        <div className='text-center'>
                            <p className='ban-error formal-font text-me text-red wrap-text'></p>
                        </div>
                        <div className="text-center ban-to-bottom">
                            <button 
                                onClick={() => handleBan(seller, '#select-' + seller.usn, '#input-' + seller.usn)}
                                className="btn btn-outline-dark admin-ban-btn w-75"
                            >
                                Commit ban
                            </button>
                        </div>
                        <div className="text-center cancel-to-bottom">
                            <button 
                                onClick={() => cancelBanSeller(seller)}
                                className="btn btn-outline-dark rtab-detail-button w-75"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className="admin-card-front" id={seller.usn}>
                        {seller.img
                            ? <img src={require(`../../${seller.img}`)} className="card-img-top p-3" alt='card'/>
                            : <div></div>
                        }
                        <div className="admin-card-front-body">
                            <p className="me-title text-lightblue">{seller.name}</p>
                            {seller.rating ? <RatingStarGenerator star={seller.rating}/> : '' }
                            {seller.type === 0 ? <p className="sm-title">Created at: <span className="rtab-money">{(new Date(seller.createdAt)).toDateString()}</span></p> : ''}
                            {seller.type === 0 ? <p className="sm-title">Total spent: <span className="rtab-money">${seller.sales}</span></p> : ''}
                            <p className="review-count">{seller.rvcount}</p>
                            {seller.type === -1 ? <p className="sm-title">Total sales <span className="rtab-money">${seller.sales}</span></p> : ''}
                            
                            <div className="text-center">
                                <button 
                                    onClick={() => moveToBan(seller)}
                                    className="btn btn-outline-dark admin-ban-btn"
                                    id={'ban-btn' + seller.usn}
                                >
                                    Ban this account
                                </button>
                                <button
                                     onClick={() => handleUnban(seller)}
                                     className="btn btn-outline-dark rtab-detail-button w-75"
                                     id={'unban-btn' + seller.usn}
                                >
                                    Unban
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    if(sellerlist.length === 0) {
        sellerlist.push(
            <div className='d-flex justify-content-center align-items-center' key='qiqi'>
                <img src={qiqifallen} className='icon-qiqi' alt='qiqi'></img>
            </div>
        )
    }

    return (
        <>
            {sellerlist}
        </>
    );
}

export default SellerList;