import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import katla from '../../images/katla.jpg'
import axios from 'axios'

function DelCategory() {

    const [categories,setCategories]=useState([])
    const [subCategories,setSubcategories]=useState([])

    useEffect(()=>{
        axios.post('http://proffus.pythonanywhere.com/api/getCategories/')
        .then(res=>{
            console.log(res.data.Categories)
            setCategories(res.data.Categories)
        })
        .catch(err=>{
            console.log(err);
        })

       
    },[])

    const handleDelete=(cid,e)=>{
        e.preventDefault();

        var data = JSON.stringify({
            "cid": parseInt(cid)
          });
          
          var config = {
            method: 'post',
            url: 'http://proffus.pythonanywhere.com/api/deleteCategory/',
            headers: { 
              'Authorization': 'Basic c2VhYmFza2V0b2ZmaWNpYWxAZ21haWwuY29tOlNlYWJhc2tldEAxMjM0', 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
        <Container>
            <center><h1 className="admin-heading">Delete Category</h1></center>
            
            <div className="row">



                    {categories.map((category,idx)=>{
                        let cat="Category" + `${idx+1}`
                        console.log(category.cat)
                        return(
                            <div className="card" style={{width:'200px',justifyContent:'center'}} key={idx}>
                                <img src={katla} alt="View all orders" style={{width:'100%'}}/>
                                <span>{category.name}</span>
                                <span className="delete" style={{marginTop:'20px'}} onClick={(e)=>handleDelete(category.cid,e)}>Delete Category</span>
                            </div>
                        )
                    })}
                    
                    {/* <div className="card" style={{width:'200px',justifyContent:'center'}}>
                        <img src={katla} alt="Add category" style={{width:'100%'}}/>
                        <span>FISH</span>
                        <span className="delete" style={{marginTop:'20px'}}>Delete category</span>
                    </div>
                    <div className="card"style={{width:'200px',justifyContent:'center'}}>
                        <img src={katla} alt="add sub category" style={{width:'100%'}}/>
                        <span>FISH</span>
                        <span className="delete" style={{marginTop:'20px'}}>Delete category</span>
                    </div> */}
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
