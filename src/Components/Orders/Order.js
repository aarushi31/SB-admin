import React from 'react'
import {Container} from 'react-bootstrap'
import './Order.css'

function Order() {
    return (
        <Container>
            <center><h1 className="admin-heading">All orders</h1></center>
            <div className="order-card">
                <div className="order-row">
                    <span>Order ID : <b>9283912</b></span>
                    <span className="date">8-October, 2021  | 13:53</span>
                </div>
                <div className="order-row buyer-details">
                    <span className="buyer" style={{borderRight:'1px solid black'}}>Buyer's name:<b>Rishabh Rawat</b></span>
                    <span className="buyer" style={{borderRight:'1px solid black'}}>Purchase worth:<b>₹ 4960.00</b></span>
                    <span className="buyer">Items:<b>4</b></span>
                </div>
                <div className="end-text">
                    <span>More details</span>
                </div>
            </div>
            <div className="order-card">
                <div className="order-row">
                    <span>Order ID : <b>9283912</b></span>
                    <span className="date">8-October, 2021  | 13:53</span>
                </div>
                <div className="order-row buyer-details">
                    <span className="buyer" style={{borderRight:'1px solid black'}}>Buyer's name:<b>Rishabh Rawat</b></span>
                    <span className="buyer" style={{borderRight:'1px solid black'}}>Purchase worth:<b>₹ 4960.00</b></span>
                    <span className="buyer">Items:<b>4</b></span>
                </div>
                <div className="end-text">
                    <span>More details</span>
                </div>
            </div>
            <div className="order-card">
                <div className="order-row">
                    <span>Order ID : <b>9283912</b></span>
                    <span className="date">8-October, 2021  | 13:53</span>
                </div>
                <div className="order-row buyer-details">
                    <span className="buyer" style={{borderRight:'1px solid black'}}>Buyer's name:<b>Rishabh Rawat</b></span>
                    <span className="buyer" style={{borderRight:'1px solid black'}}>Purchase worth:<b>₹ 4960.00</b></span>
                    <span className="buyer">Items:<b>4</b></span>
                </div>
                <div className="end-text">
                    <span>More details</span>
                </div>
            </div>
        </Container>
    )
}

export default Order
