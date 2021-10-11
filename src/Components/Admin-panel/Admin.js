import React from 'react'
import {Container} from 'react-bootstrap'
import i1 from '../../images/bag.png'
import i2 from '../../images/category.png'
import i3 from '../../images/subcat.png'
import i4 from '../../images/addItem.png'
import i5 from '../../images/delCate.png'
import i6 from '../../images/edit.png'
import './Admin.css'
import { useHistory } from 'react-router'

function Admin() {
    const history=useHistory()
    return (
        <Container>
            <center><h1 className="admin-heading">Admin panel</h1></center>
            <div className="functions">
                <div className="row">
                    <div className="card" style={{width:'200px',justifyContent:'center'}} onClick={()=>history.push('/order')}>
                        <img src={i1} alt="View all orders"/>
                        <span>View all orders</span>
                    </div>
                    <div className="card" style={{width:'200px',justifyContent:'center'}} onClick={()=>history.push('/add-category')}>
                        <img src={i2} alt="Add category"/>
                        <span>Add category</span>
                    </div>
                    <div className="card"style={{width:'200px',justifyContent:'center'}} onClick={()=>history.push('/add-subcategory')}>
                        <img src={i3} alt="add sub category"/>
                        <span>Add sub category</span>
                    </div>
                </div>
                <div className="row">
                    <div className="card" style={{width:'200px',justifyContent:'center'}} onClick={()=>history.push('/add-item')}>
                        <img src={i4} alt="add item"/>
                        <span>Add an item</span>
                    </div>
                    <div className="card" style={{width:'200px',justifyContent:'center'}} onClick={()=>history.push('/edit-items')}>
                        <img src={i5} alt="delete item"/>
                        <span>Edit/Delete an item</span>
                    </div>
                    <div className="card" style={{width:'200px',justifyContent:'center'}} onClick={()=>history.push('/delete-category')}>
                        <img src={i6} alt="delete category"/>
                        <span>Delete category</span>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Admin
