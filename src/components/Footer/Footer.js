
import {Link} from 'react-router-dom'

function Footer() {
    return (
        <footer className='bg-dark'>
            <div className="container border-bottom border-secondary border-opacity-50">
                <div className="row pt-5 pb-5">
                    <div className="col-6 col-md-3 pt-3">
                        <i className="bi bi-geo-alt footer-icon"><span className='footer-font-bold'>&nbsp; Address</span></i>
                        <p className='footer-font pt-2'>
                        1264 Kha Van Can Street<br/>Ho Chi Minh, Viet Nam
                        </p>
                    </div>

                    <div className="col-6 col-md-3 pt-3">
                        <i className="bi bi-telephone footer-icon"><span className='footer-font-bold'>&nbsp; Reservations</span></i>
                        <p className='footer-font pt-2'>
                            <strong>Phone:</strong> +84 0337839146<br/>
                            <strong>Email:</strong> sunrisefoods@gmail.com
                        </p>
                    </div>

                    <div className="col-6 col-md-3 pt-3">
                        <i className="bi bi-clock footer-icon"><span className='footer-font-bold'>&nbsp; Opening Hours</span></i>
                        <p className='footer-font pt-2'>
                        <strong>Open 24/24</strong> from
                        Monday to Sunday
                        </p>
                    </div>

                    <div className="col-6 col-md-3 pt-3 ps-4">
                        <h4 className='footer-font-bold'>Follow Us</h4>
                        <div className="d-flex">
                            <Link to="#" className="erase-underline"><i className="bi bi-twitter footer-social-icon"></i></Link>
                            <Link to="#" className="erase-underline"><i className="bi bi-facebook footer-social-icon"></i></Link>
                            <Link to="#" className="erase-underline"><i className="bi bi-instagram footer-social-icon"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pt-5 pb-5">
                <div className="footer-font text-center">
                    &copy; Copyright <strong><span>Sunrise</span></strong>. All Rights Reserved
                </div>
                <div className="footer-font text-center">
                    Designed by <Link to="#" className="footer-link">Sunrise Company</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
