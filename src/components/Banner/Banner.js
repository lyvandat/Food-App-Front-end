
import {Link} from 'react-router-dom'

function Banner(props) {
    const banners = props.imgs;

    let indicators = banners.map((banner, index) => {
        if (banner.index === 0) 
            return  <button type="button" 
                            data-bs-target={banner.id}
                            data-bs-slide-to={banner.index} 
                            className="active" 
                            aria-current="true"
                            key={index}>
                    </button>
        else
            return  <button type="button" 
                            data-bs-target={banner.id}
                            data-bs-slide-to={banner.index}
                            key={index}>
                    </button>
    });

    let inners = banners.map((banner, index) => {
        if (banner.index === 0) 
            return  <Link  className="carousel-item active" 
                        to={banner.link}
                        key={index}>
                            <img className="d-block w-100" src={banner.img} alt="banner"/>
                    </Link>
        else
            return  <Link  className="carousel-item" 
                        to={banner.link}
                        key={index}>
                            <img className="d-block w-100" src={banner.img} alt="banner"/>
                    </Link>
    });

    return (
        <div>
            <div className="carousel-indicators">
                {indicators}
            </div>
            <div className="carousel-inner">
                {inners}
            </div>
        </div>
    );
}

export default Banner;