import $ from "jquery";
import { Link } from "react-router-dom";
import CookieService from "../../services/CookieService";
import RatingStarGenerator from "../RatingStars/RatingStars";
import FoodMenu from "../FoodMenu/FoodMenu";

import about_1 from "../../assets/images/abouts/about-1.png";

import achievement_icon from "../../assets/images/icons/achievement.png";
import certificate_icon from "../../assets/images/icons/certificate.png";
import star_icon from "../../assets/images/icons/star.png";

import { useEffect, useState } from "react";
import { fetchRecommend, fetchProductDetail } from "../../api";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const MENU_TYPE = { SMALL: 0, LARGE: 1 };
const URL = "https://food-market-api.onrender.com";

function changeSellectToInput() {
  if ($("#qty-itdetail").find(":selected").val() === "many")
    $("#qty-itdetail").replaceWith(
      '<input type="number" class="form-control small-img" min=0 id="qty-itdetail">'
    );
}

function checkAndAnimate() {
  var reveals = document.querySelectorAll(".ani");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

async function addItemToCart(cart, prod) {
  try {
    console.log({
      cart,
      prod,
    });
  } catch (error) {
    console.log(error);
  }
}

const ItemDetail = () => {
  let [recommend, setRecommend] = useState([]);
  let [food, setFood] = useState(null);

  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    fetchRecommend().then((data) => {
      setRecommend(data);
    });

    fetchProductDetail(slug).then((data) => {
      setFood(data);
    });
  }, [slug]);

  const handleAddItemToCart = async function (e) {
    const slug = e.target.dataset.slug;
    const productId = e.target.dataset.productId;
    const price = +e.target.dataset.price || 0;
    const quantityInput = document.getElementById("qty-itdetail");

    const quantityInputValue = +quantityInput.value;
    if (
      quantityInputValue === "" ||
      isNaN(quantityInputValue) ||
      quantityInputValue <= 0
    ) {
      alert("S??? l?????ng nh???p kh??ng h???p l???");
      return;
    }

    try {
      // const response = await fetch(`/api/v1/products/${productId}`, {
      //   method: "PATCH",
      //   body: JSON.stringify({
      //     quantity: quantityInputValue,
      //     price,
      //     type: "add",
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const response = await axios.patch(`${URL}/api/v1/products/${slug}`, {
        quantity: quantityInputValue,
        price,
        type: "add",
        productId,
      });

      // const response = await axios.get(`${URL}/api/v1/products`);
      // console.log(response);
      // if (!response.ok) {
      //   const errRes = await response.json();
      //   alert(errRes.message);
      //   return;
      // }

      // const data = await response.json();
      const data = response.data;
      console.log(data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (!food) {
    return <div className="bg-white"></div>;
  }

  window.addEventListener("scroll", checkAndAnimate);
  return (
    <div className="bg-white">
      <div className="container pt-5">
        {/* {{!-- Item Detail --}} */}
        <div className="row pt-4 moveup-fadein-animation">
          <div className="col-3" id="itdetail-mainimg">
            <Link to={`/item/${food.slug}`}>
              <img
                src={
                  food.photo
                    ? food.photo
                    : require(`../../assets/images/foods/${food.img.detail}`)
                }
                className="img-fluid itdetail-food-img"
                alt={food.name}
              />
            </Link>
          </div>
          <div className="col-12 col-md-8 col-lg-6">
            <p className="itdetail-lger-title">{food.name}</p>
            <p className="itdetail-me-title text-indigo">
              Th????ng Hi???u: {food.brand}
            </p>

            <RatingStarGenerator
              star={food.rating}
              optionClass={"align-left"}
            />

            <p className="review-count align-left">
              &nbsp; {food.rvcount} reviews
            </p>
            {/* {{!-- Alternative item image --}} */}
            <div className="row pt-3" id="itdetail-alterimg">
              <div className="col-4">
                <Link to={food.link}>
                  <img
                    src={
                      food.photo
                        ? food.photo
                        : require(`../../assets/images/foods/${food.img.detail}`)
                    }
                    className="img-fluid itdetail-food-img"
                    alt={food.name}
                  />
                </Link>
              </div>
              <div className="col-8">
                <p className="itdetail-me-title text-green">
                  1 Order from &nbsp;
                  <span className="itdetail-lg-money">
                    {food.price}.000 VN??
                  </span>
                </p>

                <div className="d-flex justify-content-center pt-4">
                  <p className="text-center p-3 ps-0 itdetail-sm-title wrap-text">
                    <span className="material-icons itdetail-achievement-icon">
                      restaurant
                    </span>
                    <br />
                    Ngon chu???n 5 sao
                  </p>
                  <p className="text-center p-3 ps-0 itdetail-sm-title wrap-text">
                    <span className="material-icons itdetail-achievement-icon">
                      electric_car
                    </span>
                    <br />
                    Giao h??ng nhanh ch??ng
                  </p>
                  <p className="text-center p-3 ps-0 itdetail-sm-title wrap-text">
                    <span className="material-icons itdetail-achievement-icon">
                      local_police
                    </span>
                    <br />
                    B???o h??nh d??? d??y 24h
                  </p>
                </div>
              </div>
            </div>

            <div id="itdetail-mainimg">
              <br />
              <hr />
              <p className="itdetail-me-title text-green">
                1 Order from &nbsp;
                <span className="itdetail-lg-money">{food.price}.000 VN??</span>
              </p>

              <div className="d-flex justify-content-center pt-4">
                <p className="text-center p-3 itdetail-me-title wrap-text">
                  <span className="material-icons itdetail-achievement-icon">
                    restaurant
                  </span>
                  <br />
                  Ngon chu???n 5 sao
                </p>
                <p className="text-center p-3 itdetail-me-title wrap-text">
                  <span className="material-icons itdetail-achievement-icon">
                    electric_car
                  </span>
                  <br />
                  Giao h??ng nhanh ch??ng
                </p>
                <p className="text-center p-3 itdetail-me-title wrap-text">
                  <span className="material-icons itdetail-achievement-icon">
                    local_police
                  </span>
                  <br />
                  B???o h??nh d??? d??y 24h
                </p>
              </div>
            </div>

            <hr />
            <ul className="itdetail-lg-title text-justify">
              <li>
                ???????c s???n xu???t b???i c??c ?????u b???p danh gi?? s??? h???u t??? 2 ?????n 3 sao
                Michelin
              </li>
              <li>
                Uy t??n c???a th????ng hi???u ???????c g??y d???ng xuy??n su???t 69 n??m v??? an
                to??n th???c ph???m
              </li>
              <li>
                Nguy??n li???u ???????c v???n chuy???n tr???c ti???p t??? v??ng n??i l???nh gi?? ph??a
                T??y B???c, ?????m b???o ????? t????i s???ch thu???n khi???t nh???t
              </li>
              <li>
                Giao h??ng nhanh ch??ng trong v??ng 15 ph??t trong khu v???c TP H??? Ch??
                Minh v?? H?? N???i. Ri??ng ngo???i th??nh th?? ?????ng ?????t, xa th??? ai m??
                ship ????? n??ng ??i ???????c.
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <div className="itdetail-box">
              <i className="bi bi-credit-card-2-front-fill">
                <span className="lg-title"> Payment</span>
              </i>
              <p className="sm-title wrap-text text-justify text-danger pt-3">
                M??n ??n ch??? h??? tr??? nh???ng qu???c gia nh?? Vi???t Nam, Anh, Ph??p, Nh???t
                B???n, M???. C??c qu???c gia c??n l???i s??? ??p d???ng ch??nh s??ch kh??ng giao
                h??ng ngo???i qu???c.
              </p>

              <div className="pt-3">
                <i className="fa-solid fa-location-dot"></i>
                <span className="sm-title">&nbsp; Giao h??ng t???i Vi???t Nam</span>
              </div>

              <p className="me-title pt-2">
                T??nh tr???ng: <span className="text-green">{food.status}</span>
              </p>

              <form className="form-group pt-2">
                <label htmlFor="qty-itdetail" className="form-label">
                  Quantity:&nbsp;{" "}
                </label>
                <span className="d-inline-block">
                  <select
                    className="form-control"
                    id="qty-itdetail"
                    onChange={changeSellectToInput}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="many">4+</option>
                  </select>
                </span>
              </form>
              <div className="row w-75 m-auto">
                <div className="col text-center">
                  <button
                    data-product-id={food._id}
                    data-slug={food.slug}
                    data-price={food.price}
                    className="btn-addtocart mt-3"
                    onClick={handleAddItemToCart}
                  >
                    Th??m v??o gi??? h??ng
                  </button>
                  <Link to="/buy">
                    <button
                      className="btn-buynow mt-2"
                      id="item-final-single-buy"
                    >
                      Mua ngay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <hr />
        <br />
        <br />
        {/* {{!-- About Restaurant --}} */}
        <div className="ani" id="about-wrapper">
          <p className="itdetail-lg-title text-center opacity-50">ABOUT US</p>
          <p className="itdetail-main-lg-title text-center">
            V??? nh?? h??ng c???a ch??ng t??i
          </p>

          <div className="itdetail-about">
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-7 pe-0 pb-4">
                <img
                  src={about_1}
                  className="img-fluid itdetail-food-img"
                  alt="restaurant"
                />
              </div>
              <div className="col-12 col-lg-6 col-xl-5 ps-5">
                <p className="itdetail-lg-title text-center">
                  <b>
                    ???????C TH??NH L???P V?? PH??N PH???I B???I
                    <br />
                    SUNRISE COMPANY
                  </b>
                  <br />
                  <br />
                </p>
                <p className="itdetail-me-title wrap-text text-justify light-text">
                  <i>
                    Chu???i nh?? h??ng Sunrise Foods ???????c h??nh th??nh v?? ph??t tri???n
                    h??n 69 n??m. V???i uy t??n v?? ch???t l?????ng thu???c top ?????u th??? gi???i
                    v???i v?? s??? ?????u b???p s??? h???u sao Michelin v?? mu??n v??? s??ng t???o
                    trong vi???c ????a nh???ng m??n ??n ?????c l??? hay ?????c s???n ?????n m???i mi???n
                    ?????t n?????c tr??n th??? gi???i. Ch??ng t??i lu??n ch?? t??m v??o nh???ng nhu
                    c???u v?? c???m gi??c c???a kh??ch h??ng, ?????t ra nh???ng ti??u ch?? h??ng
                    ?????u ????? c?? th??? l??m h??i l??ng d?? l?? nh???ng v??? kh??ch kh?? t??nh
                    nh???t.
                  </i>
                  <br />
                  <span className="align-right">- D????ng Minh -</span>
                </p>
                <div className="d-flex justify-content-center pt-4">
                  <span className="itdetail-achievement-icon text-center">
                    <img src={star_icon} className="itdetail-icon" alt="star" />
                    <p className="p-3 itdetail-me-title">Ngon chu???n 5 sao</p>
                  </span>
                  <span className="itdetail-achievement-icon text-center">
                    <img
                      src={certificate_icon}
                      className="itdetail-icon"
                      alt="star"
                    />
                    <p className="p-3 itdetail-me-title">Ch???ng nh???n qu???c t???</p>
                  </span>
                  <span className="itdetail-achievement-icon text-center">
                    <img
                      src={achievement_icon}
                      className="itdetail-icon"
                      alt="star"
                    />
                    <p className="p-3 itdetail-me-title">Top 1 th???nh h??nh</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* {{!-- Recommend --}} */}
        <div className="pb-5 ani" id="recommend-wrapper">
          <p className="menu-large-font">G???i ?? h??m nay</p>
          <div className="row">
            <FoodMenu imgs={recommend} type={MENU_TYPE.SMALL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
