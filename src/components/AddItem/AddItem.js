import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";

import sunrise_logo from "../../assets/images/logo/SunriseFoods-logo.png";
import flavorofindia_logo from "../../assets/images/logo/FlavourOfIndia-logo.png";
import panzerhot_logo from "../../assets/images/logo/PanzerHot-logo.png";
import friggitoria from "../../assets/images/logo/Friggitoria-logo.png";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
  MdOutlineRefresh,
} from "react-icons/md";

const restaurant_logo = [
  { img: sunrise_logo, name: "Sunrise Foods", link: "#" },
  { img: flavorofindia_logo, name: "Flavour of India", link: "#" },
  { img: panzerhot_logo, name: "Panzer Hot", link: "#" },
  { img: friggitoria, name: "Friggitoria", link: "#" },
];

const AddItem = () => {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  async function handleCreateProduct(e) {
    e.preventDefault();
    if (!name || !des || !photo || !price || !category) {
      return alert("vui lòng nhập đầy đủ thông tin sản phẩm");
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category); // chưa có
    formData.append("photo", photo);
    formData.append("des", des); // chưa có
    const response = await axios.post(
      "http://localhost:5000/api/v1/products",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response);
  }

  return (
    <div class="bg-white d-flex justify-content-center align-content-center py-4">
      <div class="card w-75">
        <div class="card-header h4">Food Information Form</div>
        <div class="card-body">
          <div class="mb-3">
            <label for="InputFoodTitle" class="form-label h5">
              Food title
            </label>
            <input
              type="text"
              class="form-control"
              id="InputFoodTitle"
              placeholder="Enter your food title"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div class="mb-3">
            <label for="FoodDescription" class="form-label h5">
              Description
            </label>
            <textarea
              class="form-control"
              id="FoodDescription"
              rows="3"
              value={des}
              onChange={(e) => {
                setDes(e.target.value);
              }}
            ></textarea>
          </div>
          <div class="mb-3">
            <div class="w-full border-dotted ph-225 border-gray-300 d-flex justify-content-center align-content-center cursor-pointer">
              <label className="w-full h-full d-flex align-content-center justify-content-center text-center flex-column cursor-pointer">
                <div className=" w-full h-full d-flex justify-content-center align-content-center text-center flex-column">
                  <MdCloudUpload className="text-gray-600 text-3xl hover:text-gray-700 align-self-center" />
                  <p className="text-gray-600 hover:text-gray-700">
                    Upload Image
                  </p>
                </div>
                <input
                  type="file"
                  name="uploadimage"
                  accept="image/*"
                  className="w-0 h-0"
                  id="FoodIMG"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </div>
          <div class="row gap-3">
            <div class="col">
              <label for="FoodPrize" class="form-label h5">
                Price
              </label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="FoodPrize"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <span class="input-group-text">.000 VND</span>
              </div>
            </div>
            <div class="col">
              <label for="FoodPrize" class="form-label h5">
                Categories
              </label>
              <select
                class="form-select mb-3"
                aria-label=".form-select-lg example"
                id="ItemCate"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option selected>Default</option>
                <option value="1">Cơm</option>
                <option value="2">Phở</option>
                <option value="3">Đồ ăn vặt</option>
                <option value="3">Trà sữa</option>
                <option value="3">Bún đậu mắm tôm</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <Link class="btn btn-sm btn-outline-danger" to="/seller">
            <i class="bi bi-arrow-bar-left pe-1" aria-hidden="true"></i>Back
          </Link>
          <button
            onClick={handleCreateProduct}
            class="btn btn-sm btn-success"
            type="button"
          >
            <i class="bi bi-check pe-1" aria-hidden="true"></i>Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
