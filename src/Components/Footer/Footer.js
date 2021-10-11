import React from 'react'
import './Footer.css'
import logo from '../../images/logoWhite.png'
import Copyright from './Copyright'


function Footer() {
    return (
        <>
        <div className="footer">
            <img src={logo} alt="logo" className="logo"/>
            <div className="lists">
                <div className="l1">
                    <span>Support</span><br/>
                    <span>About Us</span><br/>
                    <span>Privacy Policy</span><br/>
                </div>
                <div className="l2">
                    <span>Terms &amp; Condition</span><br/>
                    <span>Return &amp; Refund Policy</span><br/>
                    <span>Shipping &amp; Delivery Policy</span><br/>
                </div>
                
            </div>
            
        </div>
        <Copyright/>
        </>
    )
}

export default Footer
