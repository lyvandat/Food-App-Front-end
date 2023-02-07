
import { useEffect, useState } from 'react'
import $ from 'jquery'

import SellerList from '../SellerList/SellerList'

import rightArrow from '../../assets/images/icons/right.png'
import leftArrow from '../../assets/images/icons/left.png'

import { fetchUsers, fetchSortUser } from '../../api'

const user_detail = [
    {time: '4/9/2022', users: 3400, sales: 4000},
    {time: '4/10/2022', users: 11000, sales: 54000},
    {time: '4/11/2022', users: 15000, sales: 90300},
    {time: '4/12/2022', users: 18870, sales: 352000}
]

const LIST_LENGTH = 6;
const MAX_PAGENUMBER_SHOW = 3;

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

function convertUsersToString(number_of_user) {
    if(number_of_user / 1000 > 1) {
        return '' + (number_of_user / 1000).toFixed(2) + ' K'
    }
    else {
        return '' + number_of_user;
    }
}
function percentCompareToLastMonth (type) {
    let length = user_detail.length;

    if(type === 'users') {
        return (((user_detail[length - 1].users - user_detail[length - 2].users) / user_detail[length - 1].users)  * 100).toFixed(2)
    }
    else if(type === 'sales') {
        return (((user_detail[length - 1].sales - user_detail[length - 2].sales) / user_detail[length - 1].sales)  * 100).toFixed(2)
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

function UserCenter() {
    const [initData, setInitData] = useState([]);
    let [users, setUsers] = useState([]);

    const [current_user, setCurrentUser] = useState([]);
    const [lastuser_index, setLastUserIndex] = useState(0);
    const [page_count, setPageCount] = useState(1);
    
    useEffect(() => {
        const getData = async () => {
            try {
                const users = await fetchUsers();

                const array = [];
                users.data.forEach(element => {
                    if (element["type"] === TYPE.NORMAL_USER) {
                        element["key"] = element._id;
                        array.push(element);
                    }
                });
         
                let current = [];
                for (let index = 0; index < array.length && index < 6; index++) {
                    current.push(array[index]);
                }
                
                setUsers(array);
                setInitData(array);
                setCurrentUser(current);

                setPageCount(array.length % LIST_LENGTH !== 0 ? Math.floor(array.length / LIST_LENGTH) + 1 : Math.floor(array.length / LIST_LENGTH));
                setLastUserIndex(current.length - 1);
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
            let newUserList = [];
            let start = (index - 1) * LIST_LENGTH;
            let end = start + LIST_LENGTH;

            // Move to the head of page
            $('html, body').animate({ scrollTop: 0 }, 'fast');

            if(users.length <= end)
                end = users.length;
            for(; start < end; start++) {
                newUserList.push(users[start]);
            }
            setLastUserIndex(--end);
            setCurrentUser(newUserList);
        }
    }
    const createPageNumber = (total) => {
        if(total > 1) {
            let current_page = Math.floor(lastuser_index / LIST_LENGTH) + 1;
            let pageNumBtn = [];
            let numberOfNBTN = 0;
    
            // Create prevpage_btn
            pageNumBtn.push (
                <span className='pe-1' key='prev'>
                    <button type='button' className='page-number-btn' onClick={() => changepagenumber(current_page - 1, total)}>
                        <img src={leftArrow} className='img-fluid' alt='prev'/>
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
                        <img src={rightArrow} className='img-fluid' alt='next'/>
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
    const handleBanUser = (usn) => {
        for(let i = 0; i < users.length; i++) {
            if(users[i].usn === usn) {
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
            let newCurrentUsers = [];
            for(let i = 0; i < users.length; i++) {
                if(users[i].name) {
                    if(users[i].name.toLowerCase().search(val) !== -1) {
                        newCurrentUsers.push(users[i]);
                    }
                }
            }
            users = newCurrentUsers;
            let newPageCount = users.length % LIST_LENGTH !== 0 ? Math.floor(users.length / LIST_LENGTH) + 1 : Math.floor(users.length / LIST_LENGTH);
            setPageCount(newPageCount);
            changepagenumber(1, newPageCount);
        }
    }
    const cancelSearch = () => {
        let val = $('#seller-search-box').val().trim();
        if(val !== '') {
            $('#seller-search-box').val('');
            setUsers(initData);
            let newPageCount = users.length % LIST_LENGTH !== 0 ? Math.floor(users.length / LIST_LENGTH) + 1 : Math.floor(users.length / LIST_LENGTH);
            setPageCount(newPageCount);
            changepagenumber(1, newPageCount);
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
    const sortEngine = async (option) => {
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
                if (element["type"] === TYPE.NORMAL_USER) {
                    result.push(element);
                }
            });
            users=result;
            setUsers(result);

            let newPageCount = users.length % LIST_LENGTH !== 0 ? Math.floor(users.length / LIST_LENGTH) + 1 : Math.floor(users.length / LIST_LENGTH);
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
                                    Users
                                </p>
                                <div className='card-icon blue-bg'>
                                    <i className="fa-regular fa-user fa-lg"></i>
                                </div>
                                <p className='text-bold text-xlg formal-font pt-4 mt-2 ps-2'>
                                    {convertUsersToString(
                                        user_detail[user_detail.length - 1].users
                                    )}
                                </p>
                                {renderPercent('users')}
                            </div> 
                        </div>
                        <div className='col-6 col-xl-12 pb-3'>
                            <div className='admin-sm-card'>
                                <p className='text-thin formal-font opacity-75 pt-2 ps-2 pb-1'>
                                    Total spent
                                </p>
                                <div className='card-icon yellow-bg'>
                                    <i className="fa-solid fa-dollar-sign fa-lg"></i>
                                </div>
                                <p className='text-bold text-xlg formal-font pt-4 mt-2 ps-2'>
                                    {convertUsersToString(
                                        formatter.format(user_detail[user_detail.length - 1].sales)
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
                                    id='user-name-sort'
                                    onClick={async () => await handleSort('user-name-sort')}
                                >
                                    Name
                                </button>
                                <button 
                                    type='button' 
                                    className='sort-btn m-2'
                                    id='user-time-sort'
                                    onClick={async () => await handleSort('user-time-sort')}
                                >
                                    Create time
                                </button>
                                <button 
                                    type='button' 
                                    className='sort-btn m-2'
                                    id='user-des-sort'
                                    onClick={async () => await handleSort('user-des-sort')}
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
                            <p className='formal-font text-xlg text-bold'>USER LIST</p>
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
                        <SellerList seller_list={current_user} banSeller={handleBanUser}/>
                    </div>
                    <div className='row pb-4'>
                        {createPageNumber(page_count)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCenter;