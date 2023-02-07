import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./style.css";
axios.defaults.withCredentials = true;

const URL = "https://food-market-api.onrender.com";

function Profile(props) {
  console.log(props);

  const [username, setUsername] = useState(props.userAccount.usn);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleUpdateMe(e) {
    if (username.length === 0) {
      return alert("vui lòng nhập tên đăng nhập");
    }

    const response = await axios.patch(`${URL}/api/v1/users/me`, {
      username,
    });
    alert("Cập nhật tên đăng nhập thành công");
  }

  async function handleUpdatePassword(e) {
    if (!password || !newPassword || !confirmPassword) {
      alert("Vui lòng nhập đủ thông tin");
    }

    try {
      const response = await axios.patch(`${URL}/api/v1/users/password`, {
        password,
        newPassword,
        confirmPassword,
      });
      console.log("res");
      console.log(response);
      alert("Cập nhật mật khẩu thành công");
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    }
  }

  return (
    <div class="profile-wrapper">
      <main class="main">
        <div class="user-view">
          <nav class="user-view__menu">
            <ul class="side-nav">
              <li class="side-nav--active">
                <Link to="#">Thông tin tài khoản</Link>
              </li>
              <li>
                <Link to="/orders">Đơn hàng của tôi</Link>
              </li>
              <li>
                <Link to="#">Cài đặt nâng cao</Link>
              </li>
            </ul>
          </nav>
          <div class="user-view__content">
            <div class="user-view__form-container">
              <h2 class="heading-secondary ma-bt-md">
                Thông tin cá nhân của bạn
              </h2>
              <form class="form form-user-data">
                {/* <div class="form__group">
                  <label class="form__label" for="name">
                    Tên
                  </label>
                  <input
                    class="form__input"
                    id="name"
                    type="text"
                    value={props.user_account.name}
                    required="required"
                  />
                </div> */}
                <div class="form__group ma-bt-md">
                  <label class="form__label" for="email">
                    Username
                  </label>
                  <input
                    class="form__input"
                    id="email"
                    type="text"
                    defaultValue={props.userAccount.usn}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required=" required"
                  ></input>
                </div>
                <div class="form__group form__photo-upload">
                  <img
                    class="form__user-photo"
                    id="avatar-display"
                    src="bun.png"
                    alt="img"
                  />

                  <button class="btn-text">
                    <label for="avatar-input">Thay đổi ảnh đại diện</label>
                  </button>
                  <input
                    type="file"
                    accept="*image/*"
                    id="avatar-input"
                    name="photo"
                    hidden
                  ></input>
                </div>
                <p class="create-product-error-message text-center text-danger fs-6 font-italic mt-2 mb-2"></p>
                <div class="form__group right">
                  <button
                    onClick={handleUpdateMe}
                    type="button"
                    class="btn btn--small btn--green"
                  >
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
            <div class="line">&nbsp;</div>
            <div class="user-view__form-container">
              <h2 class="heading-secondary ma-bt-md">Thay đổi mật khẩu</h2>
              <form class="form form-user-settings">
                <div class="form__group">
                  <label class="form__label" for="password-current">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    class="form__input"
                    name="current-password"
                    id="password-current"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minlength="6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="form__group">
                  <label class="form__label" for="password">
                    Mật khẩu mới
                  </label>
                  <input
                    class="form__input"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minlength="6"
                    name="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div class="form__group ma-bt-lg">
                  <label class="form__label" for="password-confirm">
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    name="confirm-password"
                    class="form__input"
                    id="password-confirm"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minlength="6"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div class="form__group right">
                  <button
                    type="button"
                    class="btn btn--small btn--green"
                    onClick={handleUpdatePassword}
                  >
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
