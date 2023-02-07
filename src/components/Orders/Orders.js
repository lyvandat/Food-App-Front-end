import React from 'react'
import foodThum1 from '../../assets/images/FoodThumnail/bun.png'
import foodThum2 from '../../assets/images/FoodThumnail/pho.png'
import foodThum3 from '../../assets/images/FoodThumnail/doannhanh.png'
import foodThum4 from '../../assets/images/FoodThumnail/dohan.png'
import foodThum5 from '../../assets/images/FoodThumnail/lau.png'
import foodThum6 from '../../assets/images/FoodThumnail/donhat.png'

const detailorder = [
    {id: 1, img: foodThum1, name: "Bún Đậu Mắm Tôm chuẩn ngon", quantity: 1, price: 89},
    {id: 1, img: foodThum3, name: "Cá Viên Chiên Makima", quantity: 2, price: 999},
    {id: 2, img: foodThum2, name: "Cơm Chay Chỉ Thiên", quantity: 3, price: 89},
    {id: 2, img: foodThum6, name: "Thập Cẩm Chả Biết Tên", quantity: 1, price: 102},
    {id: 4, img: foodThum4, name: "Nem Cuốn Hàn Xẻng", quantity: 3, price: 89},
    {id: 2, img: foodThum6, name: "Thập Cẩm Chả Biết Tên", quantity: 1, price: 102},
    {id: 3, img: foodThum4, name: "Nem Cuốn Hàn Xẻng", quantity: 3, price: 89},
    {id: 3, img: foodThum6, name: "Thập Cẩm Chả Biết Tên", quantity: 1, price: 102},
    {id: 4, img: foodThum4, name: "Nem Cuốn Hàn Xẻng", quantity: 3, price: 89},
];


const Orders = (props) => {
    const orders = props.orders;
    const orderlist = orders.map((order) => {
        return (
            <div class="">
                <div class="card card-hover mb-3 bg-eee border">
                    <div class="card-header d-flex justify-content-between">
                        <h5>{order.buyername}</h5>
                        <a class="btn btn-sm btn-success" href="/seller/orders" role="button">
                            <i class="fa fa-plus pe-1" aria-hidden="true"></i>Get Order
                        </a>
                    </div>
                    <div class="card-body p-0 ">
                        {/* <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        <ul class="list-group list-group-flush p-0 m-0">
                            {
                                detailorder.map((detail) => {
                                    if(detail.id === order.id) {
                                        return  <li class="list-group-item d-flex justify-content-between">
                                                <span>{detail.name}</span>
                                                <span>+{detail.quantity}</span>
                                            </li>
                                    }
                                    
                                })
                            }
                        </ul>
                    </div>
                    <div class="card-footer">
                        <p> <span class="h5">Total: </span><span class="rtab-money">{order.total}.000 VNĐ</span></p>
                    </div>
                </div>
            </div>
            
        )
    });
    return (
        <>
            {orderlist}
        </>
    );
}

export default Orders