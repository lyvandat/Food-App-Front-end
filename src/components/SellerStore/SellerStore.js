import React, { useState, useEffect } from 'react';
import RatingStarGenerator from '../RatingStars/RatingStars'
import {Link} from 'react-router-dom'
import { fetchProducts } from '../../api'

function SellerStore(props) {
    console.log(props.foods)
    const foods = props.foods;
    const deleteFood = (id) => {
        props.callbackDeleteMethod(id);
    }

    const foodlist = foods.map((food) => {
        return <div class="col-6 col-lg-4 pb-3">
                    <div class="card card-hover border">
                        <Link to={`/item/${food.slug}`}><img src={require(`../../assets/images/FoodThumnail/${food.img.thumbnail}`)} class="card-img-top p-3"/></Link>
                        <div class="card-body">
                            <Link to={food.link} class="erase-underline"><p class="me-title text-lightblue">{food.name}</p></Link>
                            <RatingStarGenerator star={food.rating}/>
                            <p class="review-count">{food.rvcount}</p>
                            <p class="sm-title">1 offer from <span class="rtab-money">{food.price}.000 VNĐ</span></p>
                            
                            <div class="d-flex justify-content-between text-center">
                                <Link to={`/seller/item/edit/${food.slug}`}><button class="btn btn-outline-info rtab-detail-button" onclick="changepage()">Edit</button></Link>
                                <button class="btn btn-danger rtab-detail-button" onClick={() => deleteFood(food._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
    });

    return (
        <>
            {foodlist}
        </>
    );
}

export default SellerStore;
