import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import katla from '../../images/katla.jpg'
import axios from 'axios'
import { useHistory } from 'react-router'

function DelCategory() {

    const [categories,setCategories]=useState([])
    const [subCategories,setSubcategories]=useState([])
    const history=useHistory()

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


    const handelDelete2=(scid,e)=>{
        e.preventDefault();



        var data = JSON.stringify({
            "scid": parseInt(scid)
          });
          
          var config = {
            method: 'post',
            url: 'http://proffus.pythonanywhere.com/api/deletesubcategory/',
            headers: { 
              'Authorization': 'Basic c2VhYmFza2V0b2ZmaWNpYWxAZ21haWwuY29tOlNlYWJhc2tldEAxMjM0', 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            history.push('/')
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleSubcategory=(cid,e)=>{
        e.preventDefault();
        var config = {
            method: 'post',
            url: `http://proffus.pythonanywhere.com/api/products/category/${cid}/`,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setSubcategories(response.data.Sub_Categories);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
        <Container>
            <center><h1 className="admin-heading">Delete Category</h1></center>
            
            <div className="row">



                    {categories && categories.map((category,idx)=>{
                        
                        
                        return(
                            <div className="card" style={{width:'200px',justifyContent:'center'}} key={idx}>
                                <img src={category.url} alt="Image" style={{width:'100%'}}/>
                                <span>{category.name}</span>
                                <span style={{cursor:'pointer'}} onClick={(e)=>handleSubcategory(category.cid,e)}>See sub categories</span>
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
                    
                    {subCategories && subCategories.map((sc,idx)=>{
                        return(
                            <div className="card" style={{width:'200px',justifyContent:'center'}}>
                                <img src={sc.url} alt="View all orders" style={{width:'100%'}}/>
                                <span>{sc.name}</span>
                                <span className="delete" style={{marginTop:'20px'}} onClick={(e)=>handelDelete2(sc.scid,e)}>Delete Category</span>
                            </div>
                        )
                    })}
            </div>
        </Container>
    )
}

export default DelCategory
