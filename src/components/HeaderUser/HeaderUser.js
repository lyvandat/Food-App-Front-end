// Import library
import React from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import $ from "jquery";
// Import component
import NotifyDropdownUser from "./NotifyDropdownUser";
// Import image
import sunrise_logo from "../../assets/images/logo/SunriseFoods-logo.png";
import avt from "../../assets/images/user/avt/001.jpg";
import { toSeller } from "../../api";

const onMouseUp = (e) => {
  let avt_dropdown = $(".user-dropdown-content");
  if (
    !avt_dropdown.is(e.target) && // If the target of the click isn't the container...
    avt_dropdown.has(e.target).length === 0
  ) {
    // ... or a descendant of the container.
    avt_dropdown.removeClass("active");
  }
};

const TYPE = {
  NORMAL_USER: 0,
  ADMIN: 1,
  SELLER: -1,
};

function HeaderUser(props) {
  const navigate = useNavigate();
  let adminActiveCln = "";
  let sellerActiveCln = "";

  const searchProcess = () => {
    const key = $('#search-box').val().trim();
    if(key !== '') {
      props.callbackSetKey(key);
      navigate("/products");
    }
  };

  const handleKeydown = (event) => {
    if (event.key === "Enter") {
      const key = $('#search-box').val().trim();
      if(key !== '') {
          props.callbackSetKey(key);
          navigate("/products");
      }
    }
  };

  const showAvtDropdown = (e) => {
    let avt_dropdown = $(".user-dropdown-content");
    avt_dropdown
      .toggleClass("active")
      .promise()
      .done(() => {
        if (avt_dropdown.hasClass("active")) {
          $(document).on("mouseup", onMouseUp); // Only listen for mouseup when menu is active...
        } else {
          $(document).off("mouseup", onMouseUp); // else remove listener.
        }
      });
  };
  const clickLogOut = () => {
    props.logoutMethod();
  };
  const clickAdmin = () => {
    navigate("/admin/dashboard");
  };
  const clickSeller = () => {
    navigate("/seller");
  };

  if (props.userAccount.type === TYPE.ADMIN) {
    adminActiveCln = "active";
  } else if (props.userAccount.type === TYPE.SELLER) {
    sellerActiveCln = "active";
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
                  <button
                    type="button"
                    className="nav-link active navbar-font-link pb-2 m-0 emptyBtn"
                    onClick={() => {
                      $('#show-seller-register').addClass('active');
                    }}
                  >
                    Trở thành người bán hàng
                  </button>
                </li>

                <li className="nav-item">
                  <p className="nav-link disabled navbar-font-link pb-2 m-0">
                    |
                  </p>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active navbar-font-link pb-2 m-0"
                    to="#"
                  >
                    Hỗ trợ
                  </Link>
                </li>

                <li className="nav-item">
                  <p className="nav-link disabled navbar-font-link pb-2 m-0">
                    |
                  </p>
                </li>

                <li clas="nav-item">
                  <Link
                    to="http://www.facebook.com/MinMinPD2211"
                    className="nav-link active navbar-icon pb-2 m-0"
                  >
                    <i className="bi bi-facebook"></i>
                  </Link>
                </li>
                <li clas="nav-item">
                  <Link
                    to="https://twitter.com/PHAN_DUONG_MINH"
                    className="nav-link active navbar-icon pb-2 m-0"
                  >
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
                      <Link className="dropdown-item" to="#">
                        Trở thành người bán hàng
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="#">
                        Hỗ trợ
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* {{! Right links field }} */}
              <ul className="navbar-nav">
                {/* Render a notification dropdown type nav-item */}
                <NotifyDropdownUser />

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
                      <Link className="dropdown-item" to="/">
                        Tiếng Việt
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item user-dropdown">
                  <button
                    className="nav-link avt-btn-wrapper"
                    onClick={(e) => showAvtDropdown(e)}
                  >
                    <img src={avt} className="avt me-2" alt="avt" />
                    <i className="fa-solid fa-chevron-down fa-2xs"></i>
                  </button>
                  <div className="user-dropdown-content">
                    <div className="row p-2 simple-white-btn">
                      <Link to="/me" className="erase-underline text-black">
                        <i className="fa-solid fa-user"></i>
                        &nbsp; Thông tin cá nhân
                      </Link>
                    </div>
                    <div className="row p-2 simple-white-btn">
                      <Link to="/orders" className="erase-underline text-black">
                        <i className="fa-sharp fa-solid fa-clock-rotate-left"></i>
                        &nbsp; Lịch sử mua hàng
                      </Link>
                    </div>
                    <div
                      className={
                        "row p-2 simple-white-btn admin-btn " + adminActiveCln
                      }
                    >
                      <button
                        className="text-black emptyBtn text-align-left"
                        onClick={() => clickAdmin()}
                      >
                        <i className="fa-solid fa-mug-hot"></i>
                        &nbsp; Trang Admin
                      </button>
                    </div>
                    <div
                      className={
                        "row p-2 simple-white-btn seller-btn " + sellerActiveCln
                      }
                    >
                      <button
                        className="text-black emptyBtn text-align-left"
                        onClick={() => clickSeller()}
                      >
                        <i className="fa-solid fa-piggy-bank"></i>
                        &nbsp; Trang người bán
                      </button>
                    </div>
                    <div className="row p-2 simple-white-btn">
                      <button
                        className="text-black emptyBtn text-align-left"
                        onClick={() => clickLogOut()}
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        &nbsp; Đăng xuất
                      </button>
                    </div>
                  </div>
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
                      className="search-btn"
                      id="search-button"
                      onClick={() => searchProcess()}
                    >
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                  <div className="mt-2" id="hrz-menu">
                    <Link to="/products" className="nav-menu-font">
                      Cơm
                    </Link>
                    <Link to="/products" className="nav-menu-font">
                      Phở
                    </Link>
                    <Link to="/products" className="nav-menu-font">
                      Đồ ăn vặt
                    </Link>
                    <Link to="/products" className="nav-menu-font">
                      Trà sữa
                    </Link>
                    <Link to="/products" className="nav-menu-font">
                      Bún đậu mắm tôm
                    </Link>
                  </div>
                </div>
                <div className="col d-flex justify-content-end" id="cart">
                  <Link to={`/cartdetail/${props.userAccount.id}`}>
                    <i className="bi bi-cart cart-icon"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="overlay" id='show-seller-register'>
        <div className="popup">
          <div className="content">
            <p className="xlg-title text-center pb-4">BE A MEMBER WITH US!</p>
            <p className="lg-title wrap-text text-justify">
              With one click, you can upload your foods with your awesome brand.
              We will help you to sale it by our effort. Just be a member!
            </p>
            <div className="text-center pt-4">
              <button
                className="btn btn-primary"
                onClick={() => {
                  // console.log(props.userAccount.id);
                  toSeller(props.userAccount.id);
                  navigate('/seller');

                  $('#show-seller-register').addClass('undisplay');
                }}
              >
                <span className="me-title">REGISTER TO BE SELLER</span>
              </button>
              <button 
                type="button" 
                className="close-btn-popup"
                onClick={() => {
                  $('#show-seller-register').removeClass('active');
                }}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderUser;
