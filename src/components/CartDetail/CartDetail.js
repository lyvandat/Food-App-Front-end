import $ from "jquery";
import React, { useState, useContext } from "react";
import ItemContent from "../../store/ItemContent";
import { Link, useParams } from "react-router-dom";
// Import subcomponent
import RightTab from "../RightTab/RightTab";
// Import image
import foodThum1 from "../../assets/images/FoodThumnail/bun.png";
import foodThum2 from "../../assets/images/FoodThumnail/pho.png";
import foodThum3 from "../../assets/images/FoodThumnail/doannhanh.png";
import foodThum4 from "../../assets/images/FoodThumnail/dohan.png";
import foodThum5 from "../../assets/images/FoodThumnail/lau.png";
import foodThum6 from "../../assets/images/FoodThumnail/donhat.png";
import { fetchCart } from "../../api";

const recommend = [
  {
    key: "cavienchien001",
    img: foodThum3,
    name: "Cá Viên Chiên Makima",
    link: "/item",
    rating: 5,
    rvcount: 163.523,
    price: 999,
  },
  {
    key: "nem001",
    img: foodThum4,
    name: "Nem Cuốn Hàn Xẻng",
    link: "/item",
    rating: 3.5,
    rvcount: 1.286,
    price: 56,
  },
  {
    key: "thapcam001",
    img: foodThum6,
    name: "Thập Cẩm Chả Biết Tên",
    link: "/item",
    rating: 4,
    rvcount: 15.927,
    price: 102,
  },
  {
    key: "com001",
    img: foodThum1,
    name: "Cơm Chay Chỉ Thiên",
    link: "/item",
    rating: 3,
    rvcount: 26.546,
    price: 89,
  },
];

function CartDetail() {
  const cartCtx = useContext(ItemContent);
  const [subtotal, set_subtotal] = useState(0);
  const [item_count, set_item_count] = useState(0);
  const [items, set_items] = useState([
    // {key:"bobittet001", img:foodThum5, link:"/item", name:"Bò Bít Tết Hoàng Gia", status: "Còn hàng", brand: "Sunrise Foods", notice: "Raw meet and clean decoration", price: 369, quantity: 1},
    // {key:"goi001", img:foodThum2, link:"/item", name:"Gỏi Gia Truyền Truyền Từ Thời Ông Cố Nội", status: "Còn hàng", brand: "Sunrise Foods", notice: "Raw meet and clean decoration", price: 171, quantity: 1}
  ]);
  const [cart, set_cart] = useState([]);

  const params = useParams();
  const user_id = params.id;

  const getData = async () => {
    const response = await fetchCart(user_id);

    const items_from_API = response.data.items.map((my_item, index) => {
      return {
        _id: my_item.productId._id,

        key: my_item.productId._id,
        name: my_item.productId.name,
        img: my_item.productId.img,
        rating: my_item.productId.rating,
        rvcount: my_item.productId.rvcount,
        price: my_item.productId.price,
        brand: my_item.productId.brand,
        status: my_item.productId.status,

        slug: my_item.productId.slug,
        quantity: my_item.quantity,
      };
    });

    console.log("vcl", items_from_API);

    set_items(items_from_API);
  };

  const ChangeQuantity = (e, targetkey) => {
    const new_quantity = parseInt(e.target.value);

    // Change quantity in items
    let new_items = items.map((item) => {
      if (item._id === targetkey) {
        item.quantity = new_quantity;
      }
      return item;
    });
    set_items(new_items);

    // Change quantity in cart
    let new_cart = cart.map((cart_item) => {
      if (cart_item._id === targetkey) {
        cart_item.quantity = new_quantity;
      }
      return cart_item;
    });
    set_cart(new_cart);
    cartCtx.onSet(new_cart);
    // console.log(new_cart);
    // console.log("items");
    // console.log(cartCtx.items);
  };

  const handleDeleteItem = (target_item) => {
    // Delete in items
    let new_items = items.filter((item) => item._id !== target_item._id);
    set_items(new_items);

    //Delete in cart
    let new_cart = cart.filter(
      (cart_item) => cart_item._id !== target_item._id
    );
    set_cart(new_cart);
    cartCtx.onSet(new_cart);
  };

  const getSubtotal = () => {
    let subtotal = 0;
    cart.forEach((cart_item) => {
      subtotal += cart_item.price * cart_item.quantity;
    });
    return subtotal;
  };

  function getItemCount() {
    let cart_item_count = 0;
    cart.map((cart_item) => {
      return (cart_item_count += cart_item.quantity);
    });
    console.log(cart);
    return cart_item_count;
  }

  const CartItem = (item) => {
    return (
      <div className="row" key={item._id}>
        <div className="col-3 d-flex align-items-center">
          <div className="form-check d-flex align-items-center">
            <input
              className="form-check-input sellectItem"
              type="checkbox"
              onChange={(e) => handleChooseCartItem(e.target.checked, item)}
            />
          </div>
          <Link to={`/item/${item.slug}`}>
            <img
              src={require(`../../assets/images/FoodThumnail/${item.img.thumbnail}`)}
              className="img-fluid"
              alt="item"
            />
          </Link>
        </div>
        <div className="col-7 ctdetail-itemdetail">
          <Link
            to={`/item/${item.slug}`}
            className="ctdetail-item-title erase-underline text-black"
          >
            {item.name}
          </Link>
          <p className="ctdetail-item-sm-detail text-green">
            <b>{item.status}</b>
          </p>
          <p className="ctdetail-item-sm-detail">
            Delivered from and sold by {item.brand}
          </p>
          <p className="ctdetail-item-me-detail">
            <b>Your option: </b>
            {"Raw meet and clean decoration"}
          </p>

          <div className="row mt-2 mb-2">
            <div className="col form-group">
              <label htmlFor={item._id}>Quantity: </label>
              <span className="d-inline-block">
                <input
                  type="number"
                  className="form-control small-img"
                  id={item._id}
                  defaultValue={item.quantity}
                  min={0}
                  onChange={(e) => ChangeQuantity(e, item._id)}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="row h-50">
            <p className="d-flex justify-content-start align-items-center cart-item-price">
              <b>{item.price}.000VNĐ</b>
            </p>
          </div>
          <div className="row h-50">
            <div className="d-flex justify-content-end align-items-end">
              <button
                className="btn ctdetail-delete-button"
                onClick={(e) => handleDeleteItem(item)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <hr className="m-2" />
      </div>
    );
  };

  const sellectAllClick = (e) => {
    if (e.currentTarget.checked) {
      $(".sellectItem").prop("checked", true);
      let addTotal = 0;
      let addItemCount = 0;
      items.forEach((item) => {
        let isExist = false;
        cart.forEach((cart_item) => {
          if (cart_item._id === item._id) isExist = true;
        });
        if (!isExist) {
          addTotal += item.price * item.quantity;
          addItemCount += item.quantity;
          // Add item to cart
          cart.push(item);
        }
      });

      set_subtotal(subtotal + addTotal);
      set_item_count(item_count + addItemCount);
    } else {
      $(".sellectItem").prop("checked", false);
      set_subtotal(0);
      set_item_count(0);
      // Empty the cart
      set_cart([]);
      cartCtx.onSet([]);
    }
  };

  const handleChooseCartItem = (type, item) => {
    console.log(type);

    if (type) {
      // Add item to cart
      let newCart = cart;
      // cart.push(item);
      newCart.push(item);
      set_cart(newCart);
      cartCtx.onSet(newCart);

      // Check if all item is select, then check the select all
      if ($(".sellectItem:checked").length === $(".sellectItem").length) {
        $("#selectAll").prop("checked", true);
      }
    } else {
      // Remove item from cart
      let newCart = cart;
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].key === item._id) {
          newCart.splice(i, 1);
          break;
        }
      }
      set_cart(newCart);
      cartCtx.onSet(newCart);
      // Check if sellect all is checked, then uncheck it
      if (document.getElementById("selectAll").checked) {
        $("#selectAll").prop("checked", false);
      }
    }
  };

  const CartRenderItem = (itemlist) => {
    let result;
    if (Array.isArray(itemlist) && itemlist.length > 0)
      result = itemlist.map((item, index) => {
        return CartItem(item);
      });
    else if (Array.isArray(itemlist) && itemlist.length === 0) {
      result = (
        <Link to="/" className="erase-underline">
          Your cart is empty, go to buy something?
        </Link>
      );
    } else {
      result = (
        <Link to="/" className="erase-underline">
          Cart error! Go back to home page.
        </Link>
      );
    }

    return <>{result}</>;
  };

  const RenderCast = (amount) => {
    if (amount === 0) return amount + " VNĐ";
    else return amount + ".000 VNĐ";
  };

  return (
    <div
      className="container mt-5"
      onLoad={async () => {
        await getData();
      }}
    >
      <div className="row pb-5">
        {/* {{!-- Main content --}} */}
        <div className="col-12 col-xl-9 moveup-fadein-animation">
          <div className="bg-white ctdetail">
            <p className="ctdetail-xxlg-title">Shopping Cart</p>
            <div>
              <div className="form-check align-left">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="selectAll"
                  onChange={(e) => sellectAllClick(e)}
                />
                <label className="form-check-label" htmlFor="selectAll">
                  Sellect All
                </label>
              </div>
              <p className="align-right">Price</p>
            </div>
            <br />
            <hr />

            {/* {{!-- Items --}} */}
            {CartRenderItem(items)}

            <div className="row" id="subtotal-main">
              <span>
                <p className="me-title align-right wrap-text">
                  Subtotal ({getItemCount()} items):&nbsp;
                  <b>{RenderCast(getSubtotal())}</b>
                </p>
              </span>
              <Link to="/buy">
                <button
                  className="btn btn-outline-dark rtab-detail-button align-right"
                  id="checkout-btn-main"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
          {/* {{!-- End page expand --}} */}
          <div id="endpage-expand">
            <div className="bg-white ctdetail mb-2">
              <br />
            </div>
            <p className="ctdetail-smler-text">
              The price and availability of items at Sunrise.sg are subject to
              change. The shopping cart is a temporary place to store a list of
              your items and reflects each item's most recent price. Do you have
              a promotional code? We'll ask you to enter your claim code when
              it's time to pay.
            </p>
          </div>
        </div>
        {/* {{!-- Right site bar --}} */}
        <div className="col-12 col-xl-3 moveleft-fadein-animation">
          <div className="bg-white rtab mb-4" id="subtotal-rtab">
            <i className="bi bi-credit-card-2-front-fill">
              <span className="lg-title"> Payment</span>
            </i>
            <div className="text-center">
              <p className="lg-title mt-2 wrap-text" id="cart-subtotal">
                Subtotal ({getItemCount()} items):&nbsp;
                <b>{RenderCast(getSubtotal())}</b>
              </p>
              <Link to="/buy">
                <button className="rtab-buying-button" id="checkout-btn-rtab">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
          <RightTab items={recommend} />
          {/* {{!-- second end page expand --}} */}
          <div id="scnd-endpage-expand">
            <div className="bg-white ctdetail mt-4 mb-2">
              <br />
            </div>
            <p className="ctdetail-smler-text">
              The price and availability of items at Sunrise.sg are subject to
              change. The shopping cart is a temporary place to store a list of
              your items and reflects each item's most recent price. Do you have
              a promotional code? We'll ask you to enter your claim code when
              it's time to pay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDetail;
