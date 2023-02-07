import React from 'react'
//import $ from 'jquery'
import './SellerProfilePage.css'
import { Link } from 'react-router-dom'

import avt3 from '../../assets/images/user/avt/003.jpeg'

import foodThum1 from '../../assets/images/FoodThumnail/bun.png'
import foodThum2 from '../../assets/images/FoodThumnail/pho.png'
import foodThum3 from '../../assets/images/FoodThumnail/doannhanh.png'
import foodThum4 from '../../assets/images/FoodThumnail/dohan.png'
import foodThum5 from '../../assets/images/FoodThumnail/lau.png'
import foodThum6 from '../../assets/images/FoodThumnail/donhat.png'


import flavorofindia_logo from '../../assets/images/logo/FlavourOfIndia-logo.png'



const foods = [
  { img: foodThum1, name: "Bún Đậu Mắm Tôm chuẩn ngon", link: "/item", rating: 4, rvcount: 12.567, price: 89, brand: "Friggitoria" },
  { img: foodThum2, name: "Cơm Tấm Hoàng Diệu 2", link: "/item", rating: 3.5, rvcount: 8.291, price: 25, brand: "Flavour of India" },
  { img: foodThum3, name: "Cá Viên Chiên Makima", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods" },
  { img: foodThum4, name: "Nem Cuốn Hàn Xẻng", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods" },
  { img: foodThum6, name: "Thập Cẩm Chả Biết Tên", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot" },
  { img: foodThum2, name: "Cơm Chay Chỉ Thiên", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods" },
  { img: foodThum1, name: "Bún Đậu Mắm Tôm chuẩn ngon", link: "/item", rating: 4, rvcount: 12.567, price: 89, brand: "Friggitoria" },
  { img: foodThum2, name: "Cơm Tấm Hoàng Diệu 2", link: "/item", rating: 3.5, rvcount: 8.291, price: 25, brand: "Flavour of India" },
  { img: foodThum3, name: "Cá Viên Chiên Makima", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods" },
  { img: foodThum4, name: "Nem Cuốn Hàn Xẻng", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods" },
  { img: foodThum6, name: "Thập Cẩm Chả Biết Tên", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot" },
  { img: foodThum2, name: "Cơm Chay Chỉ Thiên", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods" },
  { img: foodThum2, name: "Cơm Chay Chỉ Thiên", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods" },
  { img: foodThum1, name: "Bún Đậu Mắm Tôm chuẩn ngon", link: "/item", rating: 4, rvcount: 12.567, price: 89, brand: "Friggitoria" },
  { img: foodThum2, name: "Cơm Tấm Hoàng Diệu 2", link: "/item", rating: 3.5, rvcount: 8.291, price: 25, brand: "Flavour of India" },
  { img: foodThum3, name: "Cá Viên Chiên Makima", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods" },
  { img: foodThum4, name: "Nem Cuốn Hàn Xẻng", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods" },
  { img: foodThum6, name: "Thập Cẩm Chả Biết Tên", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot" },
  { img: foodThum2, name: "Cơm Chay Chỉ Thiên", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods" }
];

const orders = [
  { id: 1, buyername: "Lưu Minh Phát", addr: "Đại học KHTN", total: '1.500' },
  { id: 2, buyername: "Lý Văn Đạt", addr: "Đại học KHTN", total: '2.000' },
  { id: 3, buyername: "Phạm Nguyễn Cao Cường", addr: "Đại học KHTN", total: '1.000' },
  { id: 4, buyername: "Phan Phúc Đạt", addr: "Đại học KHTN", total: '600' }
];

class SellerProfilePage extends React.Component {
  state = {

  };
  render() {
    return (
      <div class="bg-white">
        <div class="container py-5">
          <div className=''>
            <p class="mb-0 h1">Seller Home</p>
            <p class="me-title opacity-75">View food list, edit, add, delete item</p>
            <hr />
          </div>
          <div class="row mt-4">
            <div class="col-12 col-md-3">
              <div class="list-group list-group-flush gap-5">
                <div class="card border">
                  <img src={flavorofindia_logo} class="" alt="" />
                </div>
                {/* Hiện các item mà seller đã đăng cũng là Layout Default của seller */}
                <Link to="/seller" class="list-group-item list-group-item-action nav-item d-flex align-content-center justify-content-between">
                  <div class="">
                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                    <span class="ps-4 me-title">Store</span>
                  </div>
                  <span class="badge badge-pill bg-danger float-end text-center">{foods.length}</span>
                </Link>
                {/* Tới trang đơn đặt hàng cùng thông báo */}
                <Link to="/seller/orders" class="list-group-item list-group-item-action nav-item d-flex align-content-center justify-content-between">
                  <div class="">
                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                    <span class="ps-4 me-title">Orders</span>
                  </div>
                  <span class="badge badge-pill bg-danger float-end text-center">{orders.length}</span>
                </Link>
                {/* Tới trang Profile của người bán để chỉnh sửa thông tin cửa hàng */}
                <div class="list-group-item nav-item">
                  <div to="#Profilecollapse" data-bs-toggle="collapse" aria-controls="Profilecollapse" aria-expanded="false" >
                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                    <span class="ps-4 me-title">Profile</span>
                  </div>
                  <div class="collapse" id="Profilecollapse">
                    <Link to="/seller/profile" class="list-group-item list-group-item-action nav-item d-flex align-content-center justify-content-between border-0">
                      <span class="ps-4 me-title">Seller Profile</span>
                    </Link>
                    <Link to="/seller/storeprofile" class="list-group-item list-group-item-action nav-item d-flex align-content-center justify-content-between border-0">
                      <span class="ps-4 me-title">Store Profile</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Content */}
            <div class="col-12 col-md-9">
              <div class="card border">
                <div class="card-header">
                  <h4 class="card-header d-flex justify-content-between">
                    Seller Profile
                  </h4>
                </div>
                <div class="card-body pt-3">
                  <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <div class="card h-100">
                        <div class="card-body">
                          <div class="account-settings">
                            <div class="user-profile">
                              <div class="user-avatar">
                                <img src={avt3} alt="" />
                              </div>
                              <h5 class="user-name">Lưu Minh Phát</h5>
                              <h6 class="user-email">20127061@student.hcmus.edu.vn</h6>
                            </div>
                            <div class="about">
                              <h5>About</h5>
                              <p>
                                Độc thân vui tính
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 m-0 p-0 card">
                      <div class="card-body h-100 m-0 p-0">
                        {/* ROW 1 */}
                        <div class="row">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 class="mb-2 text-primary">Personal Details</h6>
                          </div>
                          {/* Họ và tên */}
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                              <label for="txtName">Full Name</label>
                              <input name="Name" type="text" class="form-control" id="txtName" value="Lưu Minh Phát" />
                            </div>
                          </div>
                          {/* Username của seller */}
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                              <label for="example">Username</label>
                              <input type="" id="txtUsername" name="Username" class="form-control" value="Lumifa" readonly />
                            </div>
                          </div>
                          {/* Ngày sinh */}
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                              <label for="example">Day of birth</label>
                              <i class="fas fa-calendar input-prefix"></i>
                              <input placeholder="Select date" type="" id="txtDOB" name="DOB" class="form-control" value="11/10/2002" />
                            </div>
                          </div>
                          {/* Email */}
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                              <label for="txtEmail">Email</label>
                              <input name="Email" type="email" class="form-control" id="txtEmail" value="20127061@student.hcmus.edu.vn" />
                            </div>
                          </div>
                          {/* Số điện thoại */}
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                              <label for="txtPhone">Phone</label>
                              <input name="SDT" type="text" class="form-control" id="txtPhone" value="0867571874" maxlength="11" />
                            </div>
                          </div>
                          {/* Trang web riêng */}
                          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                              <label for="txtWebsite">Website URL</label>
                              <input name="Website" type="url" class="form-control" id="txtWebsite" placeholder="Website url" />
                            </div>
                          </div>
                          {/* Phần Mô tả */}
                          <div class="col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                              <label>Mô tả</label>
                              <textarea name="Mota" class="form-control" id="txtMota" rows="4" >
                                Mãi mãi tuổi 18 - Độc thân vui tính - Hiền nhưng không dễ chọc
                              </textarea>
                            </div>
                          </div>
                        </div>
                        {/* ROW 2 */}
                        <div class="row gutters">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 class="mt-3 mb-2 text-primary">Address</h6>
                          </div>
                          <div class="col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                              <label for="txtStreet">Address</label>
                              <input name="DiaChi" type="text" class="form-control" id="txtDiaChi" value="DH KHTN" />
                            </div>
                          </div>
                        </div>
                        {/* ROW 3 */}
                        <div class="row gutters">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 class="mt-3 mb-2 text-primary">Avatar</h6>
                          </div>
                          <div class="col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                              <label for="Avatar">Choose avatar</label>
                              <input type="file" multiple id="Avatar" name="Avatar" />
                            </div>
                          </div>
                        </div>
                        {/* ROW 4 */}
                        <div class="row gutters">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="text-right">
                              <Link to="/seller"><button type="button" class="btn btn-secondary me-2" onclick="location.href='/seller'">Cancel</button></Link>
                              <button type="submit" class="btn btn-primary">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default SellerProfilePage