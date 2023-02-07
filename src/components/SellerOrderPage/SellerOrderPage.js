
import React, { useState, useEffect } from 'react';
import $ from 'jquery'

import { fetchProducts } from '../../api'


import foodThum1 from '../../assets/images/FoodThumnail/bun.png'
import foodThum2 from '../../assets/images/FoodThumnail/pho.png'
import foodThum3 from '../../assets/images/FoodThumnail/doannhanh.png'
import foodThum4 from '../../assets/images/FoodThumnail/dohan.png'
import foodThum5 from '../../assets/images/FoodThumnail/lau.png'
import foodThum6 from '../../assets/images/FoodThumnail/donhat.png'

import SellerStore from '../SellerStore/SellerStore'
import Orders from '../Orders/Orders'

import flavorofindia_logo from '../../assets/images/logo/FlavourOfIndia-logo.png'

import rightArrow from '../../assets/images/icons/right.png'
import leftArrow from '../../assets/images/icons/left.png'

/*import Orders from '../Orders/Orders';

const MENU_TYPE = {SMALL: 0,LARGE: 1};
let recommend = [
    {img: foodThum1, name: "Bún Đậu Mắm Tôm chuẩn ngon", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 12.567, price: 89},
    {img: foodThum2, name: "Cơm Tấm Hoàng Diệu 2", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 8.291, price: 25},
    {img: foodThum3, name: "Cá Viên Chiên Makima", link: "/item", fstar: 5, hstar: 0, nstar: 0, rvcount: 163.523, price: 999},
    {img: foodThum4, name: "Nem Cuốn Hàn Xẻng", link: "/item", fstar: 3, hstar: 1, nstar: 1, rvcount: 1.286, price: 56},
    {img: foodThum5, name: "Thập Cẩm Chả Biết Tên", link: "/item", fstar: 4, hstar: 0, nstar: 1, rvcount: 15.927, price: 102},
    {img: foodThum6, name: "Cơm Chay Chỉ Thiên", link: "/item", fstar: 3, hstar: 0, nstar: 2, rvcount: 26.546, price: 89}
]*/

const LIST_LENGTH = 9;
const MAX_PAGENUMBER_SHOW = 3;


const orders = [
    { id: 1, buyername: "Lưu Minh Phát", addr: "Đại học KHTN", total: '1.500' },
    { id: 2, buyername: "Lý Văn Đạt", addr: "Đại học KHTN", total: '2.000' },
    { id: 3, buyername: "Phạm Nguyễn Cao Cường", addr: "Đại học KHTN", total: '1.000' },
    { id: 4, buyername: "Phan Phúc Đạt", addr: "Đại học KHTN", total: '600' }
];
let foods = [];

const SellerPageTest = () => {
    const [ datapage_callAPI, setDatapageCallAPI ] = useState([]);
    const [ current_food, setCurrenFood ] = useState([]);
    const [ lastfood_index, setLastFoodIndex ] = useState(8);
    const [ page_count, setPageCount ] = useState(null);
    useEffect(() => {
        const getData = async () => {
            const foods_data = await fetchProducts();
            const data = foods_data.data;

            const myData = data.slice(0, 9);

            foods = data;

            setDatapageCallAPI(data);
            setCurrenFood(myData);
            setPageCount(data.length % 9 !== 0 ? Math.floor(data.length / 9) + 1 : Math.floor(data.length / 9))
        }

        getData();
    }, [])
    const changepagenumber = (index, total) => {
        if(index > 0 && index <= total) {
            let newFoodList = [];
            let start = (index - 1) * LIST_LENGTH;
            let end = start + LIST_LENGTH;
    
            // Move to the head of page
            $('html, body').animate({ scrollTop: 0 }, 'fast');
    
            if(foods.length <= end)
                end = foods.length;
            for(; start < end; start++) {
                newFoodList.push(foods[start]);
            }
            setLastFoodIndex(--end);
            setCurrenFood(newFoodList);
        }
    }
    const createPageNumber = (total) => {
        total = orders.length % 9 !== 0 ? Math.floor(orders.length / 9) + 1 : Math.floor(orders.length / 9);
        if(total > 1) {
            let current_page = Math.floor(lastfood_index / LIST_LENGTH) + 1;
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
    
        return (
            <div class="bg-white">
                <div class="container py-5">
                    <div className=''>
                        <p class="mb-0 h1">Seller Home</p>
                        <p class="me-title opacity-75">View food list, edit, add, delete item</p>
                        <hr />
                    </div>
                    {/* Side Bar */}
                    <div class="row mt-4">
                        <div class="col-12 col-md-3">
                            <div class="list-group list-group-flush gap-5">
                                <div class="card border">
                                    <img src={flavorofindia_logo} class="" alt="" />
                                </div>
                                {/* Hiện các item mà seller đã đăng cũng là Layout Default của seller */}
                                <a href="/seller" class="list-group-item list-group-item-action nav-item d-flex align-content-center justify-content-between">
                                    <div class="">
                                        <i class="fa fa-caret-right" aria-hidden="true"></i>
                                        <span class="ps-4 me-title">Store</span>
                                    </div>
                                    <span class="badge badge-pill bg-danger float-end text-center">{foods.length}</span>
                                </a>
                                {/* Tới trang đơn đặt hàng cùng thông báo */}
                                <a href="/seller/orders" class="list-group-item list-group-item-action nav-item d-flex align-content-center justify-content-between">
                                    <div class="">
                                        <i class="fa fa-caret-right" aria-hidden="true"></i>
                                        <span class="ps-4 me-title">Orders</span>
                                    </div>
                                    <span class="badge badge-pill bg-danger float-end text-center">{orders.length}</span>
                                </a>
                                {/* Tới trang Profile của người bán để chỉnh sửa thông tin cửa hàng */}
                                <div class="list-group-item nav-item">
                                    <div href="#Profilecollapse" data-bs-toggle="collapse" aria-controls="Profilecollapse" aria-expanded="false" >
                                        <i class="fa fa-caret-right" aria-hidden="true"></i>
                                        <span class="ps-4 me-title">Profile</span>
                                    </div>
                                    <div class="collapse" id="Profilecollapse">
                                        <a href="/seller/profile" class="list-group-item list-group-item-action nav-item d-flex align-content-center justify-content-between border-0">
                                            <span class="ps-4 me-title">Seller Profile</span>
                                        </a>
                                        <a href="/seller/storeprofile" class="list-group-item list-group-item-action nav-item d-flex align-content-center justify-content-between border-0">
                                            <span class="ps-4 me-title">Store Profile</span>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* Content */}
                        <div class="col-12 col-md-9">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-header d-flex justify-content-between">
                                        Orders
                                    </h4>
                                </div>
                                {/* Hiện danh đơn đặt hàng của seller */}
                                <div class="card-body">
                                    <div class="row d-flex justify-content-center align-content-center">
                                        <Orders orders={orders} />
                                    </div>
                                </div>
                                {/* Thanh đổi trang */}
                                <ul class="row pb-4">
                                    {createPageNumber(page_count)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    

};

export default SellerPageTest;