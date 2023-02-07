import { Link } from "react-router-dom";

import RatingStarGenerator from "../RatingStars/RatingStars";
import qiqifallen from "../../assets/images/others/qiqi-fallen.png";

function FoodList(props) {
  const foods = props.foods;

  let foodlist = foods.map((food, index) => {
    return (
      <div className="col-6 col-lg-4 pb-3" key={index}>
        <div className="card card-hover border">
          <Link to={`/item/${food.slug}`}>
            <img
              src={
                food.photo
                  ? food.photo
                  : require(`../../assets/images/FoodThumnail/${food.img.thumbnail}`)
              }
              className="card-img-top p-3"
              alt="card"
            />
          </Link>
          <div className="card-body">
            <Link to={`/item/${food.slug}`} className="erase-underline">
              <p className="me-title text-lightblue">{food.name}</p>
            </Link>
            <RatingStarGenerator star={food.rating} />
            <p className="review-count">{food.rvcount}</p>
            <p className="sm-title">
              1 offer from{" "}
              <span className="rtab-money">{food.price}.000 VNĐ</span>
            </p>
            <div className="text-center">
              <Link
                className="btn btn-outline-dark rtab-detail-button"
                to={`/item/${food.slug}`}
              >
                See more detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });

  if (foodlist.length === 0) {
    foodlist.push(
      <div
        className="d-flex justify-content-center align-items-center"
        key="empty"
      >
        <img src={qiqifallen} className="icon-qiqi" alt="qiqi"></img>
      </div>
    );
  }

  return <>{foodlist}</>;
}

export default FoodList;
