import React from 'react'
import { Container } from 'react-bootstrap'
import katla from '../../images/katla.jpg'

function DelCategory() {
    return (
        <Container>
            <center><h1 className="admin-heading">Delete Category</h1></center>
            
            <div className="row">
                    <div className="card" style={{width:'200px',justifyContent:'center'}}>
                        <img src={katla} alt="View all orders" style={{width:'100%'}}/>
                        <span>FISH</span>
                        <span className="delete" style={{marginTop:'20px'}}>Delete Category</span>
                    </div>
                    <div className="card" style={{width:'200px',justifyContent:'center'}}>
                        <img src={katla} alt="Add category" style={{width:'100%'}}/>
                        <span>FISH</span>
                        <span className="delete" style={{marginTop:'20px'}}>Delete category</span>
                    </div>
                    <div className="card"style={{width:'200px',justifyContent:'center'}}>
                        <img src={katla} alt="add sub category" style={{width:'100%'}}/>
                        <span>FISH</span>
                        <span className="delete" style={{marginTop:'20px'}}>Delete category</span>
                    </div>
            </div>
            <center><h1 className="admin-heading">Delete Sub-Category</h1></center>
            
            <div className="row">
                    <div className="card" style={{width:'200px',justifyContent:'center'}}>
                        <img src={katla} alt="View all orders" style={{width:'100%'}}/>
                        <span>FISH</span>
                        <span className="delete" style={{marginTop:'20px'}}>Delete Category</span>
                    </div>
                    <div className="card" style={{width:'200px',justifyContent:'center'}}>
                        <img src={katla} alt="Add category" style={{width:'100%'}}/>
                        <span>FISH</span>
                        <span className="delete" style={{marginTop:'20px'}}>Delete category</span>
                    </div>
                    <div className="card"style={{width:'200px',justifyContent:'center'}}>
                        <img src={katla} alt="add sub category" style={{width:'100%'}}/>
                        <span>FISH</span>
                        <span className="delete" style={{marginTop:'20px'}}>Delete category</span>
                    </div>
            </div>
        </Container>
    )
}

export default DelCategory
