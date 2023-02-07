import $ from "jquery";
import { useContext, useState } from "react";
import ItemContent from "../../store/ItemContent";
import food from "../../assets/images/FoodThumnail/lau.png";
import momo_icon from "../../assets/images/icons/momo.png";
import banking_icon from "../../assets/images/icons/debit-card.png";
import cod_icon from "../../assets/images/icons/cod.png";
import visa_icon from "../../assets/images/icons/visa.png";
import React from "react";
import axios from "axios";

const URL = "http://localhost:5000";

// const items = [
//   {
//     key: "bbt001",
//     img: food,
//     link: "/item",
//     name: "Bò Bít Tết Hoàng Gia",
//     status: "Còn hàng",
//     brand: "Sunrise Foods",
//     quantity: 1,
//     price: 369,
//   },
// ];

const BuyDetail = function (props) {
  // items = [];
  const payment_methods = [
    {
      key: "momo-method",
      value: "card",
      img: momo_icon,
      label: "Thanh toán Online bằng Momo (Có mã ưu đãi)",
    },
    {
      key: "banking-method",
      value: "card",
      img: banking_icon,
      label: "Chuyển khoản ngân hàng (Miễn phí phí chuyển)",
    },
    {
      key: "cod-method",
      value: "cash",
      img: cod_icon,
      label: "Thanh toán khi nhận hàng (COD)",
    },
    {
      key: "visa-method",
      value: "card",
      img: visa_icon,
      label: "Thanh toán Online bằng Visa, Master, JCB (Miễn phí phí chuyển)",
    },
  ];

  const cartCtx = useContext(ItemContent);
  const items = cartCtx.items;

  // get information from input
  const [nameValue, setName] = useState("");
  const [phoneValue, setPhone] = useState("");
  const [addressValue, setAddress] = useState("");
  const [noteValue, setNote] = useState("");
  const [paymentValue, setPayment] = useState("");

  console.log("items from cartCtx");
  console.log(items);
  console.log(cartCtx);

  function handleMethodSelect(e, targetkey, methods) {
    if (e.target.checked) {
      methods.map((method) => {
        if (method.key !== targetkey) {
          setPayment(method.value);
          return $("#" + method.key).prop("checked", false);
        }
        return "";
      });
    }
  }
  function PaymentMethodsMenu(methods) {
    const payment_methods_menu = methods.map((method, index) => {
      return (
        <div className="row pt-2" key={index}>
          <div className="col-auto d-flex align-items-center">
            <input
              className="form-check-input mt-auto mb-auto me-2"
              type="checkbox"
              id={method.key}
              onChange={(e) => handleMethodSelect(e, method.key, methods)}
            />
          </div>
          <div className="col-auto d-flex align-items-center">
            <img src={method.img} className="itdetail-icon" alt="icon" />
          </div>
          <div className="col-auto d-flex align-items-center">
            <label className="form-check-label" htmlFor={method.key}>
              {method.label}
            </label>
          </div>
        </div>
      );
    });

    return <>{payment_methods_menu}</>;
  }
  function ItemInPurchase(items) {
    const item_list = items.map((item, index) => {
      return (
        <div className="row p-4" key={index}>
          <div className="col-4 p-0">
            <img
              src={item.img.thumbnail}
              className="img-fluid small-img smooth-border"
              alt="item"
            />
          </div>
          <div className="col-8 p-0">
            <p className="sm-title wrap-text mb-0">{item.name}</p>
            <p className="sm-title text-indigo mb-0">
              Thương Hiệu: {item.brand}
            </p>
            <p className="sm-title mb-0">
              Tình trạng:{" "}
              <span className="text-green">
                {item.status ? "Còn hàng" : "Hết hàng"}
              </span>
            </p>
            <div className="sm-title mb-0">
              <i className="fa-solid fa-location-dot "></i>
              <span>&nbsp; Giao hàng tại Việt Nam</span>
            </div>
            <p className="sm-title">
              <i className="bi bi-box-seam-fill"></i>&nbsp; Số lượng:{" "}
              {item.quantity}
            </p>
          </div>
        </div>
      );
    });
    return <>{item_list}</>;
  }
  async function clickOrderBtn(e) {
    if (
      !nameValue ||
      nameValue.trim().length === 0 ||
      !phoneValue ||
      phoneValue.trim().length === 0 ||
      !addressValue ||
      addressValue.trim().length === 0 ||
      !noteValue ||
      noteValue.trim().length === 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin mua hàng");
      return;
    }

    const response = await axios.post(`${URL}/api/v1/orders`, {
      name: nameValue,
      phone: phoneValue,
      address: addressValue,
      note: noteValue,
      payment: paymentValue,
      products: items,
    });

    console.log(response);
    alert("successfully");
  }

  return (
    <div className="container pt-5">
      <div className="row pb-4">
        <div className="col-12 col-lg-8 moveup-fadein-animation">
          <div className="bg-white">
            {/* {{!-- Infor fullfill --}} */}
            <div className="p-4 pt-3">
              <p className="itdetail-lg-title">
                Để đặt hàng, vui lòng điền thông tin dưới đây.
              </p>
              <div className="row pt-3">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="pt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Địa chỉ"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>

              <div className="row">
                <div className="col-12 col-lg-4 pt-3">
                  <select className="form-select" name="ls_province"></select>
                </div>
                <div className="col-12 col-lg-4 pt-3">
                  <select className="form-select" name="ls_district"></select>
                </div>
                <div className="col-12 col-lg-4 pt-3">
                  <select className="form-select" name="ls_ward"></select>
                </div>
              </div>

              <div className="pt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Lời nhắn cho nhà hàng"
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* {{!-- End infor fullfill --}} */}
          </div>

          <div className="col mb-3">
            <div className="bg-white mt-3 p-4 pt-3">
              {/* {{!-- Payment methods select --}} */}
              <p className="itdetail-lg-title pb-4">
                Hãy chọn phương thức thanh toán.
              </p>
              {PaymentMethodsMenu(payment_methods)}
              {/* {{!-- End payment methods select --}}    */}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 moveleft-fadein-animation">
          <div className="bg-white h-100">
            <div className="rtab">
              <i className="bi bi-credit-card-2-front-fill">
                <span className="lg-title"> Payment</span>
              </i>

              {ItemInPurchase(items)}
              <div className="row p-4 pt-0 pb-3">
                <hr />
                <div className="col-8 p-0">
                  <input
                    type="text"
                    className="form-control"
                    id="coupon-input"
                    placeholder="Mã giảm giá"
                  />
                </div>
                <div className="col-4 pe-0">
                  <button className="smooth-square-button">Áp dụng</button>
                </div>
              </div>
              <div className="row p-4 pt-0 pb-3">
                <hr />
                <div className="d-flex">
                  <p className="me-title m-auto ms-0">Tạm tính:</p>
                  <p className="me-title">
                    {cartCtx.totalAmount ? cartCtx.totalAmount : 0}.000 VNĐ
                  </p>
                </div>
                <div className="d-flex">
                  <p className="me-title m-auto ms-0">Phí vận chuyển:</p>
                  <p className="me-title">20.000 VNĐ</p>
                </div>
              </div>
              <div className="row p-4 pt-0">
                <hr />
                <div className="d-flex">
                  <p className="lg-title m-auto ms-0">Tổng cộng</p>
                  <p className="lg-title">
                    {cartCtx.totalAmount ? cartCtx.totalAmount + 20 : cartCtx}
                    .000 VNĐ
                  </p>
                </div>
              </div>
              <div className="row p-4 pt-0">
                <div className="d-flex justify-content-end p-0">
                  <button
                    onClick={clickOrderBtn}
                    className="rtab-buying-button"
                  >
                    <p className="me-title">Đặt hàng</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyDetail;
