
import {Link} from 'react-router-dom'

import RatingStarGenerator from '../RatingStars/RatingStars'

const MENU_TYPE = {SMALL: 0,LARGE: 1}

function FoodMenu(props) {
    const foods = props.imgs;

    if (!foods) {
        return (
            <div className='row d-flex'></div>
        );
    };

    let menu;
    if(props.type === MENU_TYPE.SMALL) 
        menu = foods.map((food, index) => {
            return  <div className="col-6 col-md-4 col-xl-2 m-auto p-4 large-thumnail" key={index}>
                        <Link to={`/item/${food.slug}`}><img src={require(`../../assets/images/FoodThumnail/${food.img.thumbnail}`)} className="img-fluid pb-3" alt='food'/></Link>
                        <Link to={`/item/${food.slug}`} className="erase-underline"><p className="me-title text-lightblue">{food.name}</p></Link>
                        <RatingStarGenerator star={food.rating}/>
                        <p className="review-count">{food.rvcount}</p>
                        <p className="sm-title">1 offer from <span className="rtab-money">{food.price}.000 VNĐ</span></p>
                    </div>
        });
    else if(props.type === MENU_TYPE.LARGE) 
        menu = foods.map((food, index) => {
            return  <div className='col-12 col-sm-6 large-thumnail' key={index}>
                        <div className="row ps-2">
                            <div className="col-5 pe-0">
                                <Link to={`/item/${food.slug}`} className='thumnail-ref-container'><img src={require(`../../assets/images/FoodThumnail/${food.img.thumbnail}`)} className="w-100 pb-2" alt='thumnail'/></Link>
                            </div>
                            <div className="col-7">
                                <Link to={`/item/${food.slug}`} className="erase-underline text-black me-title wrap-text mb-0" id="name-me-title">{food.name}</Link>
                                <p to={`/item/${food.slug}`} className="sm-title text-indigo mb-0">Thương Hiệu: {food.brand}</p>
                                <RatingStarGenerator star={food.rating}/>
                                <p className="sm-title">1 offer from <span className="rtab-money">{food.price}.000 VNĐ</span></p>
                                <p className="sm-title mb-0">Tình trạng: <span className="text-green">{food.status}</span></p>
                            </div>
                        </div>
                    </div>   
        });
    return (
        <div className='row d-flex'>
            {menu}
        </div>
    );
}

export default FoodMenu;