import { Link } from "react-router-dom";

import RatingStarGenerator from "../RatingStars/RatingStars";
import qiqifallen from "../../assets/images/others/qiqi-fallen.png";

function PostList(props) {
  const posts = props.posts;
  let postlist = posts.map((post, index) => {
    return (
      <div className="col-6 col-lg-4 pb-3" key={index}>
        <div className="card card-hover food-card">
          <Link to={`/item/${post.slug}`}>
            <img
              src={
                post.photo
                  ? post.photo
                  : require(`../../assets/images/FoodThumnail/${post.img.thumbnail}`)
              }
              className="card-img-top p-3"
              alt="post"
            />
          </Link>
          <div className="card-body food-body">
            <Link to={`/item/${post.slug}`} className="erase-underline">
              <p className="me-title text-lightblue">{post.name}</p>
            </Link>
            <RatingStarGenerator star={post.rating} />
            <p className="review-count">{post.rvcount}</p>
            <p className="sm-title">
              1 offer from{" "}
              <span className="rtab-money">{post.price}.000 VNĐ</span>
            </p>
            <div className="text-center">
              <Link
                className="btn btn-outline-dark rtab-detail-button w-75"
                to="/item"
              >
                See more detail
              </Link>
            </div>
            <div className="text-center">
              <button
                onClick={() => props.callbackDelete(post.name)}
                className="btn btn-outline-dark admin-ban-btn w-75"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  if (postlist.length === 0) {
    postlist.push(
      <div
        className="d-flex justify-content-center align-items-center"
        key="empty"
      >
        <img src={qiqifallen} className="icon-qiqi" alt="qiqi"></img>
      </div>
    );
  }

  return <>{postlist}</>;
}

export default PostList;
