import axios from "axios";
axios.defaults.withCredentials = true;
import CookieService from "../services/CookieService";

// const URL = "http://localhost:5000";
const URL = "https://food-market-api.onrender.com";

export const GetRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const fetchProducts = (options = {}) => {
  //const query = options ? `?name=${options}` : '';
  const query = "";

  return axios.get(`${URL}/api/v1/products${query}`);
};

export const fetchRecommend = async () => {
  try {
    const response = await axios.get(`${URL}/api/v1/products`);
    return GetRandom(response.data, 6);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchProductDetail = (slug) => {
  return axios
    .get(`${URL}/api/v1/products/${slug}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const deteteProduct = (id) => {
  return axios.delete(`${URL}/api/v1/products/${id}/delete`);
};

// =======================================================

export const fetchUsers = () => {
  return axios.get(`${URL}/api/v1/users`);
  // .then(function (response) {
  //     return response.data;
  // })
  // .catch(console.error());
};

export const fetchSortUser = (options) => {
  let sortBy = "";
  for (const key in options) {
    if (Object.hasOwnProperty.call(options, key)) {
      if (options[key]) {
        sortBy += sortBy.length === 0 ? key : `-${key}`;
      }
    }
  }

  return axios.get(`${URL}/api/v1/users/?sort=${sortBy}`);
};

export const createUser = function (data) {
  axios
    .post(`${URL}/api/v1/users/create`, data)
    .then((response) => {
      console.log(response);
      CookieService.set("jwt", response.data.token, { path: "/" });
      window.location.href = "#success";
    })
    .catch(console.error());
};

// login
export const loginWithJwt = function (data) {
  axios
    .post(`${URL}/api/v1/users/create-jwt`, data)
    .then((response) => {
      CookieService.set("jwt", response.data.token, { path: "/" });
      //   window.location.href = "#success";
    })
    .catch(console.error());
};

export const banUser = function (user) {
  return axios.patch(`${URL}/api/v1/admin/ban/${user._id}`);
};

export const unbanUser = function (user) {
  return axios.patch(`${URL}/api/v1/admin/unban/${user._id}`);
};

export const toSeller = function (_id) {
  return axios.patch(`${URL}/api/v1/users/${_id}/to-seller`);
};

// =======================================================

export const fetchCart = function (userId) {
  console.log(userId);
  return axios.get(`${URL}/api/v1/cart/${userId}`);
};
