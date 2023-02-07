
import React from "react";

function BrandMenu(props) {
    const brands = props.brands;
    const brand_menu = brands.map((brand, index) => {
        return (
            <div className="col-6 mt-2 mb-2" key={index}>
                {/* <button className="brand-btn" onClick={callCallback(props.callback, brand.name)}> */}
                <button type="button" className="brand-btn">
                    <div className="row">
                        <div className="col-12 col-lg-4 ps-0 d-flex align-items-center justify-content-center">
                            <img src={brand.img} className="itdetail-icon" alt='brand'/>
                        </div>
                        <div className="col-12 col-lg-8 ps-0 d-flex align-items-center justify-content-center">
                            <span className="me-title text-black text-center">{brand.name}</span>
                        </div>
                    </div>
                </button>
            </div>
        );
    })
    return (
        <React.Fragment>
            {brand_menu}
        </React.Fragment>
    )
}

export default BrandMenu;