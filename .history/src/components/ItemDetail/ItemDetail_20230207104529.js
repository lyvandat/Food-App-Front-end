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
      alert("Số lượng nhập không hợp lệ");
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
              Thương Hiệu: {food.brand}
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
                    {food.price}.000 VNĐ
                  </span>
                </p>

                <div className="d-flex justify-content-center pt-4">
                  <p className="text-center p-3 ps-0 itdetail-sm-title wrap-text">
                    <span className="material-icons itdetail-achievement-icon">
                      restaurant
                    </span>
                    <br />
                    Ngon chuẩn 5 sao
                  </p>
                  <p className="text-center p-3 ps-0 itdetail-sm-title wrap-text">
                    <span className="material-icons itdetail-achievement-icon">
                      electric_car
                    </span>
                    <br />
                    Giao hàng nhanh chóng
                  </p>
                  <p className="text-center p-3 ps-0 itdetail-sm-title wrap-text">
                    <span className="material-icons itdetail-achievement-icon">
                      local_police
                    </span>
                    <br />
                    Bảo hành dạ dày 24h
                  </p>
                </div>
              </div>
            </div>

            <div id="itdetail-mainimg">
              <br />
              <hr />
              <p className="itdetail-me-title text-green">
                1 Order from &nbsp;
                <span className="itdetail-lg-money">{food.price}.000 VNĐ</span>
              </p>

              <div className="d-flex justify-content-center pt-4">
                <p className="text-center p-3 itdetail-me-title wrap-text">
                  <span className="material-icons itdetail-achievement-icon">
                    restaurant
                  </span>
                  <br />
                  Ngon chuẩn 5 sao
                </p>
                <p className="text-center p-3 itdetail-me-title wrap-text">
                  <span className="material-icons itdetail-achievement-icon">
                    electric_car
                  </span>
                  <br />
                  Giao hàng nhanh chóng
                </p>
                <p className="text-center p-3 itdetail-me-title wrap-text">
                  <span className="material-icons itdetail-achievement-icon">
                    local_police
                  </span>
                  <br />
                  Bảo hành dạ dày 24h
                </p>
              </div>
            </div>

            <hr />
            <ul className="itdetail-lg-title text-justify">
              <li>
                Được sản xuất bởi các đầu bếp danh giá sở hữu từ 2 đến 3 sao
                Michelin
              </li>
              <li>
                Uy tín của thương hiệu được gây dựng xuyên suốt 69 năm về an
                toàn thực phẩm
              </li>
              <li>
                Nguyên liệu được vận chuyển trực tiếp từ vùng núi lạnh giá phía
                Tây Bắc, đảm bảo độ tươi sạch thuần khiết nhất
              </li>
              <li>
                Giao hàng nhanh chóng trong vòng 15 phút trong khu vực TP Hồ Chí
                Minh và Hà Nội. Riêng ngoại thành thì đừng đặt, xa thế ai mà
                ship đồ nóng đi được.
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <div className="itdetail-box">
              <i className="bi bi-credit-card-2-front-fill">
                <span className="lg-title"> Payment</span>
              </i>
              <p className="sm-title wrap-text text-justify text-danger pt-3">
                Món ăn chỉ hỗ trợ những quốc gia như Việt Nam, Anh, Pháp, Nhật
                Bản, Mỹ. Các quốc gia còn lại sẽ áp dụng chính sách không giao
                hàng ngoại quốc.
              </p>

              <div className="pt-3">
                <i className="fa-solid fa-location-dot"></i>
                <span className="sm-title">&nbsp; Giao hàng tại Việt Nam</span>
              </div>

              <p className="me-title pt-2">
                Tình trạng: <span className="text-green">{food.status}</span>
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
                    Thêm vào giỏ hàng
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
            Về nhà hàng của chúng tôi
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
                    ĐƯỢC THÀNH LẬP VÀ PHÂN PHỐI BỞI
                    <br />
                    SUNRISE COMPANY
                  </b>
                  <br />
                  <br />
                </p>
                <p className="itdetail-me-title wrap-text text-justify light-text">
                  <i>
                    Chuỗi nhà hàng Sunrise Foods được hình thành và phát triển
                    hơn 69 năm. Với uy tín và chất lượng thuộc top đầu thế giới
                    với vô số đầu bếp sở hữu sao Michelin và muôn vẻ sáng tạo
                    trong việc đưa những món ăn độc lạ hay đặc sản đến mọi miền
                    đất nước trên thế giới. Chúng tôi luôn chú tâm vào những nhu
                    cầu và cảm giác của khách hàng, đặt ra những tiêu chí hàng
                    đầu để có thể làm hài lòng dù là những vị khách khó tính
                    nhất.
                  </i>
                  <br />
                  <span className="align-right">- Dương Minh -</span>
                </p>
                <div className="d-flex justify-content-center pt-4">
                  <span className="itdetail-achievement-icon text-center">
                    <img src={star_icon} className="itdetail-icon" alt="star" />
                    <p className="p-3 itdetail-me-title">Ngon chuẩn 5 sao</p>
                  </span>
                  <span className="itdetail-achievement-icon text-center">
                    <img
                      src={certificate_icon}
                      className="itdetail-icon"
                      alt="star"
                    />
                    <p className="p-3 itdetail-me-title">Chứng nhận quốc tế</p>
                  </span>
                  <span className="itdetail-achievement-icon text-center">
                    <img
                      src={achievement_icon}
                      className="itdetail-icon"
                      alt="star"
                    />
                    <p className="p-3 itdetail-me-title">Top 1 thịnh hành</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* {{!-- Recommend --}} */}
        <div className="pb-5 ani" id="recommend-wrapper">
          <p className="menu-large-font">Gợi ý hôm nay</p>
          <div className="row">
            <FoodMenu imgs={recommend} type={MENU_TYPE.SMALL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
