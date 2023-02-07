
import { useState, useEffect } from 'react'
import $ from 'jquery'

import SellerList from '../SellerList/SellerList'

import seller1 from '../../assets/images/logo/SunriseFoods-logo.png'
import seller2 from '../../assets/images/logo/assikoreanfood.png'
import seller3 from '../../assets/images/logo/burgerzone.png'
import seller4 from '../../assets/images/logo/caravanserai.png'
import seller5 from '../../assets/images/logo/FlavourOfIndia-logo.png'
import seller6 from '../../assets/images/logo/Friggitoria-logo.png'
import seller7 from '../../assets/images/logo/goichi.png'
import seller8 from '../../assets/images/logo/gyroshop.png'
import seller9 from '../../assets/images/logo/hawaii.png'
import seller10 from '../../assets/images/logo/ichisando.png'
import seller11 from '../../assets/images/logo/longboard.png'
import seller12 from '../../assets/images/logo/panadicto.png'
import seller13 from '../../assets/images/logo/PanzerHot-logo.png'
import seller14 from '../../assets/images/logo/quellipizza.png'
import seller15 from '../../assets/images/logo/shokudo.png'
import seller16 from '../../assets/images/logo/vinny.png'

import rightArrow from '../../assets/images/icons/right.png'
import leftArrow from '../../assets/images/icons/left.png'

import { fetchUsers, fetchSortUser } from '../../api'

const seller_detail = [
    {time: '4/9/2022', sellers: 1500, sales: 3000},
    {time: '4/10/2022', sellers: 6700, sales: 50000},
    {time: '4/11/2022', sellers: 9800, sales: 90000},
    {time: '4/12/2022', sellers: 14000, sales: 200000}
]

const LIST_LENGTH = 6;
const MAX_PAGENUMBER_SHOW = 3;

const thisIsCallFromAPI = [
    {img: seller1, name: "Sunrise Foods", rating: 4, rvcount: 12.567, total_sales: 890, usn: 'sunrisefoods'},
    {img: seller2, name: "Assi Korean Food", rating: 3.5, rvcount: 8.291, total_sales: 250, usn: 'assikoreanfood'},
    {img: seller3, name: "Burger Zone", rating: 5, rvcount: 163.523, total_sales: 9990, usn: 'burgerzone'},
    {img: seller4, name: "Caravansekai", rating: 3.5, rvcount: 1.286, total_sales: 560, usn: 'caravansekai'},
    {img: seller5, name: "Flavor of India", rating: 4, rvcount: 15.927, total_sales: 1020, usn: 'flavorofindia'},
    {img: seller6, name: "La Friggitoria", rating: 3, rvcount: 26.546, total_sales: 890, usn: 'lafriggitoria'},
    {img: seller7, name: "Goichi", rating: 4, rvcount: 12.567, total_sales: 890, usn: 'goichi'},
    {img: seller8, name: "Mr.G's Gyro Shop", rating: 3.5, rvcount: 8.291, total_sales: 250, usn: 'gyroshop'},
    
    {img: seller9, name: "Hawaii", rating: 5, rvcount: 163.523, total_sales: 9990, usn: 'hawaii'},
    {img: seller10, name: "Ichi Sando", rating: 3.5, rvcount: 1.286, total_sales: 560, usn: 'ichisando'},
    {img: seller11, name: "Longboard", rating: 4, rvcount: 15.927, total_sales: 1020, usn: 'longboard'},
    {img: seller12, name: "Pan Adicto", rating: 3, rvcount: 26.546, total_sales: 890, usn: 'panadicto'},
    {img: seller13, name: "Panzer Hot", rating: 3, rvcount: 26.546, total_sales: 890, usn: 'panzerhot'},
    {img: seller14, name: "Quelli Pizza", rating: 3.5, rvcount: 1.286, total_sales: 560, usn: 'quellipizza'},
    {img: seller15, name: "Shokudo", rating: 4, rvcount: 15.927, total_sales: 1020, usn: 'shokudo'},
    {img: seller16, name: "Vinny", rating: 3, rvcount: 26.546, total_sales: 890, usn: 'vinny'}
];

let sellers = [
    {img: seller1, name: "Sunrise Foods", rating: 4, rvcount: 12.567, total_sales: 890, usn: 'sunrisefoods'},
    {img: seller2, name: "Assi Korean Food", rating: 3.5, rvcount: 8.291, total_sales: 250, usn: 'assikoreanfood'},
    {img: seller3, name: "Burger Zone", rating: 5, rvcount: 163.523, total_sales: 9990, usn: 'burgerzone'},
    {img: seller4, name: "Caravansekai", rating: 3.5, rvcount: 1.286, total_sales: 560, usn: 'caravansekai'},
    {img: seller5, name: "Flavor of India", rating: 4, rvcount: 15.927, total_sales: 1020, usn: 'flavorofindia'},
    {img: seller6, name: "La Friggitoria", rating: 3, rvcount: 26.546, total_sales: 890, usn: 'lafriggitoria'},
    {img: seller7, name: "Goichi", rating: 4, rvcount: 12.567, total_sales: 890, usn: 'goichi'},
    {img: seller8, name: "Mr.G's Gyro Shop", rating: 3.5, rvcount: 8.291, total_sales: 250, usn: 'gyroshop'},
    {img: seller9, name: "Hawaii", rating: 5, rvcount: 163.523, total_sales: 9990, usn: 'hawaii'},
    {img: seller10, name: "Ichi Sando", rating: 3.5, rvcount: 1.286, total_sales: 560, usn: 'ichisando'},
    {img: seller11, name: "Longboard", rating: 4, rvcount: 15.927, total_sales: 1020, usn: 'longboard'},
    {img: seller12, name: "Pan Adicto", rating: 3, rvcount: 26.546, total_sales: 890, usn: 'panadicto'},
    {img: seller13, name: "Panzer Hot", rating: 3, rvcount: 26.546, total_sales: 890, usn: 'panzerhot'},
    {img: seller14, name: "Quelli Pizza", rating: 3.5, rvcount: 1.286, total_sales: 560, usn: 'quellipizza'},
    {img: seller15, name: "Shokudo", rating: 4, rvcount: 15.927, total_sales: 1020, usn: 'shokudo'},
    {img: seller16, name: "Vinny", rating: 3, rvcount: 26.546, total_sales: 890, usn: 'vinny'}
];

const TYPE = {
    NORMAL_USER: 0,
    ADMIN: 1,
    SELLER: -1
}

const option = {
    name: false, 
    time: false,
    des: false,
};

function convertSellersToString(number_of_seller) {
    if(number_of_seller / 1000 > 1) {
        return '' + (number_of_seller / 1000).toFixed(2) + ' K'
    }
    else {
        return '' + number_of_seller;
    }
}
function percentCompareToLastMonth (type) {
    let length = seller_detail.length;

    if(type === 'sellers') {
        return (((seller_detail[length - 1].sellers - seller_detail[length - 2].sellers) / seller_detail[length - 1].sellers)  * 100).toFixed(2)
    }
    else if(type === 'sales') {
        return (((seller_detail[length - 1].sales - seller_detail[length - 2].sales) / seller_detail[length - 1].sales)  * 100).toFixed(2)
    }
}

function renderPercent (type) {
    let percent = percentCompareToLastMonth(type);
    let pc_tag;
    if(percent < 0) {
        percent *= -1;
        pc_tag = (
            <p className='text-green text-bold text-sm percent-wrapper'>
                <i className="fa-solid fa-arrow-down"></i>
                &nbsp;{percent + ' %'}
            </p>
        );
    }
    else {
        pc_tag = (
            <p className='text-sm'>
                <span className='percent-wrapper text-green'>
                    <i className="fa-solid fa-arrow-up"></i>
                    &nbsp;{percent + ' %'}
                </span>
                <span className='text-thin opacity-75'> vs. Previous month</span>
            </p> 
        );
    }
    return (
        <div className='pt-2 ps-2'>
            {pc_tag}
        </div>
    )
}

function SellerCenter() {
    const [thisIsCallFromAPI, setInitData] = useState([]);
    let [sellers, setSellers] = useState([]);

    const [current_seller, setCurrentSeller] = useState([]);
    const [lastseller_index, setLastSellerIndex] = useState(current_seller.length - 1);
    const [page_count, setPageCount] = useState(sellers.length % LIST_LENGTH !== 0 ? Math.floor(sellers.length / LIST_LENGTH) + 1 : Math.floor(sellers.length / LIST_LENGTH));
    
    useEffect(() => {
        const getData = async () => {
            try {
                const users = await fetchUsers();

                const array = [];
                users.data.forEach(element => {
                    if (element["type"] === TYPE.SELLER) {
                        element["key"] = element._id;
                        array.push(element);
                    }
                });
         
                let current = [];
                for (let index = 0; index < array.length && index < 6; index++) {
                    current.push(array[index]);
                }
                
                setSellers(array);
                setInitData(array);
                setCurrentSeller(current);

                setPageCount(array.length % LIST_LENGTH !== 0 ? Math.floor(array.length / LIST_LENGTH) + 1 : Math.floor(array.length / LIST_LENGTH));
                setLastSellerIndex(current.length - 1);
            } catch (err) {
                console.log(err);
            }
        }

        getData()
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const changepagenumber = (index, total) => {
        if(index > 0 && index <= total) {
            let newSellerList = [];
            let start = (index - 1) * LIST_LENGTH;
            let end = start + LIST_LENGTH;

            // Move to the head of page
            $('html, body').animate({ scrollTop: 0 }, 'fast');

            if(sellers.length <= end)
                end = sellers.length;
            for(; start < end; start++) {
                newSellerList.push(sellers[start]);
            }
            setLastSellerIndex(--end);
            setCurrentSeller(newSellerList);
        }
    }
    const createPageNumber = (total) => {
        if(total > 1) {
            let current_page = Math.floor(lastseller_index / LIST_LENGTH) + 1;
            let pageNumBtn = [];
            let numberOfNBTN = 0;
    
            // Create prevpage_btn
            pageNumBtn.push (
                <span className='pe-1' key='prev'>
                    <button type='button' className='page-number-btn' onClick={() => changepagenumber(current_page - 1, total)}>
                        <img src={leftArrow} className='img-fluid'  alt='left-arrow'/>
                    </button>
                </span>
            )
            // Create numberpage_btn
            for(let i = 1; i <= total && numberOfNBTN < MAX_PAGENUMBER_SHOW; i++) {
                let class_name = 'page-number-btn';
                if(i === current_page)
                    class_name += ' page-number-btn-active';
                pageNumBtn.push (
                    <span className='pe-1' key={i}>
                        <button 
                            type='button' 
                            className={class_name}
                            onClick={() => changepagenumber(i, total)}
                            id={'page-btn-' + i}
                        >
                            {i}
                        </button>
                    </span>
                )
                ++numberOfNBTN;
                if(numberOfNBTN === MAX_PAGENUMBER_SHOW && current_page >= i && i + 1 <= total) {
                    pageNumBtn.splice(1, 1);
                    --numberOfNBTN;
                }
            }
            // Create nextpage_btn
            pageNumBtn.push (
                <span className='pe-1' key='next'>
                    <button type='button' className='page-number-btn' onClick={() => changepagenumber(current_page + 1, total)}>
                        <img src={rightArrow} className='img-fluid' alt='next-btn'/>
                    </button>
                </span>
            )
    
            return (
                <div className='d-flex justify-content-center align-items-center'>
                    {pageNumBtn}
                </div>
            )
        }
        else {
            return (<></>);
        }
    }
    const handleBanSeller = (usn) => {
        for(let i = 0; i < sellers.length; i++) {
            if(sellers[i].usn === usn) {
                // Call API to set status to STATUS.BAN
                console.log("ban " + usn);
            }
        }
    }
    const handleKeydown = (event) => {
        if(event.key === 'Enter') {
            searchProcess();
        }
    }
    const searchProcess = () => {
        let val = $('#seller-search-box').val().trim().toLowerCase();
        if(val !== '') {
            let newCurrentSellers = [];
            for(let i = 0; i < sellers.length; i++) {
                if(sellers[i].name.toLowerCase().search(val) !== -1) {
                    newCurrentSellers.push(sellers[i]);
                }
            }
            sellers = newCurrentSellers;
            setPageCount(sellers.length % LIST_LENGTH !== 0 ? Math.floor(sellers.length / LIST_LENGTH) + 1 : Math.floor(sellers.length / LIST_LENGTH));
            changepagenumber(1, page_count);
        }
    }
    const cancelSearch = () => {
        let val = $('#seller-search-box').val().trim();
        if(val !== '') {
            $('#seller-search-box').val('');
            sellers = thisIsCallFromAPI;
            setPageCount(sellers.length % LIST_LENGTH !== 0 ? Math.floor(sellers.length / LIST_LENGTH) + 1 : Math.floor(sellers.length / LIST_LENGTH));
            changepagenumber(1, page_count);
        }
    }
    const showCancelButton = () => {
        let val = $('#seller-search-box').val().trim();
        if(val !== '') {
            $('.cancel-btn-searchbox').removeClass('undisplay');
        }
        else {
            $('.cancel-btn-searchbox').addClass('undisplay');
        }
    }
    // Order 1-increase 0-decrease
    const sortEngine = async () => {
        try {
            const response = await fetchSortUser(option);

            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
    const handleSort = async (id) => {
        let sort_btn_list = document.querySelectorAll(".sort-btn");
        if(sort_btn_list) {
            sort_btn_list.forEach(btn => {
                if(btn.id === id) {
                    if(btn.classList.contains('sort-btn-active')) {
                        btn.classList.remove('sort-btn-active');

                        const subOne = id.substr(id.indexOf('-') + 1);
                        const subTwo = subOne.substr(0, subOne.indexOf('-'))
                        option[subTwo] = false
                    }
                    else {
                        btn.classList.add('sort-btn-active');

                        const subOne = id.substr(id.indexOf('-') + 1);
                        const subTwo = subOne.substr(0, subOne.indexOf('-'))
                        option[subTwo] = true;
                    }
                }
            })

            const raw_data = await sortEngine(option);
            const result = []
            raw_data.forEach((element) => {
                if (element["type"] === TYPE.SELLER) {
                    result.push(element);
                }
            });
            sellers=result;
            setSellers(result);

            let newPageCount = sellers.length % LIST_LENGTH !== 0 ? Math.floor(sellers.length / LIST_LENGTH) + 1 : Math.floor(sellers.length / LIST_LENGTH);
            setPageCount(newPageCount);
            changepagenumber(1, newPageCount);
        }
    }
    return (
        <div className='admin-content pt-2'>
            <div className='row'>
                <div className='col-12 col-xl-3 admin-content-left-side'>
                    <div className='row'>
                        <div className='col-6 col-xl-12 pb-3'>
                            <div className='admin-sm-card'>
                                <p className='text-thin formal-font opacity-75 pt-2 ps-2 pb-1'>
                                    Sellers
                                </p>
                                <div className='card-icon blue-bg'>
                                    <i className="fa-regular fa-user fa-lg"></i>
                                </div>
                                <p className='text-bold text-xlg formal-font pt-4 mt-2 ps-2'>
                                    {convertSellersToString(
                                        seller_detail[seller_detail.length - 1].sellers
                                    )}
                                </p>
                                {renderPercent('sellers')}
                            </div> 
                        </div>
                        <div className='col-6 col-xl-12 pb-3'>
                            <div className='admin-sm-card'>
                                <p className='text-thin formal-font opacity-75 pt-2 ps-2 pb-1'>
                                    Sales
                                </p>
                                <div className='card-icon yellow-bg'>
                                    <i className="fa-solid fa-dollar-sign fa-lg"></i>
                                </div>
                                <p className='text-bold text-xlg formal-font pt-4 mt-2 ps-2'>
                                    {convertSellersToString(
                                        formatter.format(seller_detail[seller_detail.length - 1].sales)
                                    )}
                                </p>
                                {renderPercent('sales')}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='filter-card'>
                                <p className='formal-font text-me text-bold pb-1'>
                                <i className="fa-solid fa-arrow-down-a-z"></i>
                                    &nbsp;&nbsp;Sort by
                                </p>
                                <hr className='mt-2'/>
                                <button 
                                    type='button' 
                                    className='sort-btn m-2'
                                    id='seller-name-sort'
                                    onClick={async () => await handleSort('seller-name-sort')}
                                >
                                    Name
                                </button>
                                <button 
                                    type='button' 
                                    className='sort-btn m-2'
                                    id='seller-sales-sort'
                                    onClick={async () => await handleSort('seller-sales-sort')}
                                >
                                    Total sales
                                </button>
                                <button 
                                    type='button' 
                                    className='sort-btn m-2'
                                    id='seller-des-sort'
                                    onClick={async () => await handleSort('seller-des-sort')}
                                >
                                    Desending Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-xl-9 bg-white ps-0 border-radius-smooth'>
                    <div className="row p-5 pt-4 pb-0">
                        <div className='col-12 col-xl-5 d-flex align-items-center'>
                            <p className='formal-font text-xlg text-bold'>SELLER LIST</p>
                        </div>
                        <div className='col-12 col-xl-7'>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control search-box"
                                    id="seller-search-box"
                                    placeholder="Find any seller?"
                                    onKeyDown={(e) => handleKeydown(e)}
                                    onChange={showCancelButton}
                                />
                                <button 
                                    type='button' 
                                    className='cancel-btn-searchbox undisplay'
                                    onClick={() => cancelSearch()}
                                >
                                    <i className="fa-solid fa-x"></i>
                                </button>
                                <button 
                                    type="button" 
                                    className="search-btn" 
                                    id="search-button" 
                                    onClick={() => searchProcess()}
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='row p-5 pt-3'>
                        <SellerList seller_list={current_seller} banSeller={handleBanSeller}/>
                    </div>
                    <div className='row pb-4'>
                        {createPageNumber(page_count)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerCenter;