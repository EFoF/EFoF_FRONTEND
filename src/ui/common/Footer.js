import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedin, FaInstagram, FaVimeoV, FaDribbble, FaBehance, FaEnvelopeOpen } from "react-icons/fa";

const Footer = ({parentClass}) => {
    
    return (
        <footer className="footer-area splash-footer">
            <div className="container">
                <div className="footer-bottom">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="footer-copyright">
                                <span className="copyright-text">© {new Date().getFullYear()}. All rights reserved by <a href="https://github.com/EFoF">독수리 오남매</a>.</span>
                            </div>
                        </div>
                        <div className="col-lg-2">
                        </div>
                        <div className="col-lg-5">
                            <div className="footer-bottom-link">
                                <ul className="list-unstyled">
                                    <li><Link to={ process.env.PUBLIC_URL + "/privacy-policy" }  style={{ color: 'gray' }}>이용약관</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;