import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
axios.defaults.withCredentials = true;
import avt from "../../assets/images/user/avt/001.jpg";
function Order(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://food-market-api.onrender.com/api/v1/orders")
      .then((response) => {
        console.log("fetch orders");
        console.log(response);
        setOrders(response.data.data.orders);
      });
  }, []);

  function ItemsInOrder(product) {
    return (
      <div className="order__item-detail d-flex align-items-center pb-3 border-bottom border-success my-3">
        <div className="order__image-wrapper me-3">
          <img alt="img" className="order__image" src={product.img.thumbnail} />
        </div>
        <div>
          <h5 className="mb-0 fs-6 fw-semibold">{product.name}</h5>
          <p className="text-secondary">Nhà hàng: {product.brand}</p>
          {/* <p>x{product}</p> */}
        </div>
        <span className="d-block fw-semibold justify-self-end ms-auto">
          {product.price}.000 VNĐ
        </span>
      </div>
    );
  }

  function OrderItem(order) {
    let itemsInOrder = null;
    if (order) {
      console.log("products");
      console.log(order.products);

      itemsInOrder = order.products.map((prod) => {
        return ItemsInOrder(prod);
      });
    }

    return (
      <div className="row">
        <div className="col-12 bg-white p-4 mb-3">
          <div className="order__info d-flex align-items-center justify-content-between pb-3 border-bottom border-success">
            <div className="order__info-shop d-flex align-items-baseline">
              <i className="fa-solid fa-store d-block me-2"></i>
              <h5 className="me-3 fs-6">Sunrise E-market</h5>
              <Link
                className="d-block me-3 text-decoration-none px-3 py-2 text-white bg-danger border"
                to="/"
              >
                <i className="fa-solid fa-comment me-1"></i>Nhắn tin
              </Link>
              <Link
                className="d-block me-3 text-decoration-none px-3 py-2 text-muted border"
                to="/"
              >
                <i className="fa-solid fa-store me-1"></i>Xem shop
              </Link>
            </div>
            <div className="order__info-status d-flex align-items-baseline">
              <i className=" fa-solid fa-truck text-muted"></i>
              <span className="d-block mx-2">Đang xử lí</span>
              <h4 className="fs-5 text-danger border-start fw-normal ps-3 border-secondary">
                Đánh giá
              </h4>
            </div>
          </div>
          {/* them san pham trong don hang vao day */}
          {itemsInOrder}
          <div className="order__price">
            <div className="me-auto d-flex justify-content-end align-items-center mb-3">
              <i className="fa-regular fa-money-bill-1 text-danger fs-5"></i>
              <p className="d-inline-block ms-2 fs-6">Thành Tiền: </p>
              <h5 className="d-inline-block ms-2 fs-4 text-danger fw-normal">
                ₫{order?.subTotal}.000
              </h5>
            </div>
            <div className="d-flex mt-3 align-items-center">
              <span className="d-inline-block text-muted">
                Không có đánh giá nào
              </span>
              <Link
                to="/"
                className="order__price-btn order__price-detail d-inline-block py-2 px-3 bg-danger text-white text-decoration-none border ms-auto me-3"
              >
                Xem chi tiết đơn
              </Link>
              <Link
                to="/"
                className="order__price-btn order__price-chat d-inline-block py-2 px-3 text-black text-decoration-none border"
              >
                Liên hệ người bán
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let ordersRendered = null;
  if (orders.length > 0) {
    ordersRendered = orders.map((order) => {
      return OrderItem(order);
    });
  }

  // let itemsInOrder;
  // if (orders.length > 0) {
  //   itemsInOrder = orders.products.map((prod) => {
  //     return ItemsInOrder(prod);
  //   });
  // }

  if (orders.length === 0) {
    return (
      <div className="py-5 d-flex flex-column justify-content-center align-items-center">
        <h4 className="text-danger">Không có đơn hàng đã đặt nào</h4>
        <div className="" style={{ width: "200px", height: "160px;" }}>
          <img className="w-100" src="empty.png" alt="img" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-4 pb-5">
      <div className="row">
        <div className="col-12 col-md-3">
          <Link to="/me" className="order__profile">
            <div className="profile__image-wrapper">
              <img src={avt} alt="img"></img>
            </div>
            <div className="profile__info">
              <h5>{props.userAccount.usn}</h5>
              <p>
                <i className="fa-solid fa-pencil"></i>&nbsp;Sửa hồ sơ
              </p>
            </div>
          </Link>
          <ul className="p-3 order__menu">
            <li className="order__menu-item">
              <Link to="/me" className="text-decoration-none text-black">
                <i className="fa-solid fa-user text-primary me-3"></i>Tài khoản
                của tôi{" "}
              </Link>
            </li>
            <li className="order__menu-item">
              <Link to="/orders" className="text-decoration-none text-black">
                <i className="fa-solid fa-clipboard text-primary me-3"></i>Đơn
                mua
              </Link>
            </li>
            <li className="order__menu-item">
              <Link to="#" className="text-decoration-none text-black">
                <i className="fa-solid fa-ticket text-danger me-3"></i>Kho
                voucher
              </Link>
            </li>
          </ul>
        </div>
        {/* danh sách đơn đặt hàng */}
        <div className="col-12 col-md-9">{ordersRendered}</div>
      </div>
    </div>
  );
}

export default Order;
// san pham trong don hang
// {{#each products}}
//           <div className="order__item-detail d-flex align-items-center pb-3 border-bottom border-success my-3">
//             <div className="order__image-wrapper me-3">
//               <img className="order__image" src="{{productId.foodThumbnail}}">
//             </div>
//             <div>
//               <h5 className="mb-0 fs-6 fw-semibold">{{productId.name}}</h5>
//               <p className="text-secondary">Phân loại hàng: {{productId.category.[0]}}</p>
//               <p>x{{quantity}}</p>
//             </div>
//             <span className="d-block fw-semibold justify-self-end ms-auto">₫{{{toPrice productId.price}}}</span>
//           </div>
//           {{/each}}
// không có giỏ hàng

/* <div className="py-5 d-flex flex-column justify-content-center align-items-center">
        <h4 className="text-danger">Không có đơn hàng đã đặt nào</h4>
        <div className="" style="width: 200px; height: 160px;">
          <img className="w-100" src="/images/cart/empty.png" alt="empty cart image">
        </div>
      </div> */

// order
