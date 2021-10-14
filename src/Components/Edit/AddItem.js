import React, { useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import upload from '../../images/upload.png'
import './style.css'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'


function AddSubCategory() {

    const [files,setFiles]=useState([])
    const [fpath,setFpath]=useState();
    const [fname,setFname]=useState();
    const [ftype,setFtype]=useState()
    

    const {getRootProps,getInputProps}=useDropzone({
        accept:'image/*',
        onDrop:(acceptedFiles)=>{
            setFiles(
                acceptedFiles.map((file)=>Object.assign(file,{
                    preview:URL.createObjectURL(file)
                }))
            )
        }
    })


    const images=files.map(file=>{
        
        // setFpath(file.path);
        // setFname(file.name);
        // setFtype(file.type);
        return(
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{width:'100px'}} alt="preview"/>
            </div>
        </div>
        )
    })

    const [message,setMessage]=useState('');
    
    const [title,setTitle]=useState()
    const [sellPrice,setSellPrice]=useState()
    const [origPrice,setOrigPrice]=useState()
    const [inStock,setInstock]=useState("In stock")
    const [desc,setDesc]=useState('');
    const [specif,setSpeci]=useState('');
    const [type,setType]=useState('');
    const [options,setOptions]=useState(1);
    const [cid,setCid]=useState();
    const [scid,setScid]=useState();
    const [optionsData,setOptionsdata]=useState({});

    
    

    



    

    const [url,setUrl]=useState('');

    const getUrl=()=>{

        const data=new FormData()
        data.append('file',files[0])

        var config = {
            method: 'post',
            url: 'http://proffus.pythonanywhere.com/api/addimage/',
            headers: { 
              'Authorization': 'Basic c2VhYmFza2V0b2ZmaWNpYWxAZ21haWwuY29tOlNlYWJhc2tldEAxMjM0', 
              'Content-Type': 'application/json'
            },
            data : data
          };

          axios(config)
          .then(res=>{
              console.log(res)
              setUrl(res.data.url)
          })
          .catch(err=>{
              console.log(err)
          })
    }

    var data = JSON.stringify({
      "name": title,
      "image_url": url,
      "after_sale_price": parseInt(sellPrice),
      "actual_price": parseInt(origPrice),
      "in_stock": Boolean(inStock),
      "description": desc,
      "specification": specif,
      "Type": type,
      "scid":scid,
      "options": {
        "1": {
          "name": "Small"
        },
        "2": {
          "name": "Medium"
        },
        "3": {
          "name": "Large"
        }
      },
      "cid": cid
    });

  
    

  
  var config = {
      method: 'post',
      url: 'http://proffus.pythonanywhere.com/api/addProduct/',
      headers: { 
        'Authorization': 'Basic c2VhYmFza2V0b2ZmaWNpYWxAZ21haWwuY29tOlNlYWJhc2tldEAxMjM0', 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials':true
      },
      data : data
  };

    const handleSubmit=(e)=>{
        e.preventDefault()
        setMessage('')
        


        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          if(response){
            setMessage('Item added successfully')
          }
          else{
              setMessage('Error adding item')
          }
        })
        .catch(function (error) {
          console.log(error);
        });


        setTitle('');
        setFiles([]);
        setTitle('');
        setCid();
        setScid();
        setDesc('');
        setInstock()
        
    }

    

    return (
        <Container className="main-container">
             <center><h1 className="admin-heading">Add item</h1></center>
             <div className="upload-box" {...getRootProps()}>
                 
                    <div>{images}</div>
                    <img src={upload} alt="upload image"/>
                    
                    
                    
                    <input {...getInputProps()}/>
                    <span style={{marginLeft:'0'}}>Drop your file here</span>
                    <button className="btn" style={{ marginTop: "30px",
                    width: "20vw",
                    textAlign: "center",
                    backgroundColor: "#0E79BD",
                    border: "none",
                    borderRadius: "10px",
                    color: "white"}} onClick={getUrl}>Submit photo</button>
                 
             </div>
             
             
             <input type="text" placeholder="Item name" className="input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
             <input type="number" placeholder="Sell Price" className="input" value={sellPrice} onChange={(e)=>setSellPrice(e.target.value)}/>
             <input type="number" placeholder="Original Price" className="input" value={origPrice} onChange={(e)=>setOrigPrice(e.target.value)}/>
             {/* <input type="text" placeholder="In Stock(Type true or false)" className="input" value={inStock} onChange={(e)=>setInstock(e.target.value==='true'?true:false)}/> */}
             <select name="In stock" value={inStock} className="input" onChange={(e)=>setInstock(e.target.value)} defaultValue="In stock">
                 <option value="In stock">In stock</option>
                <option value="true">yes</option>
                <option value="false">no</option>
             </select>


             <input type="text" placeholder="Description" className="input" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
             <input type="text" placeholder="Specifications" className="input" value={specif} onChange={(e)=>setSpeci(e.target.value)}/>
             <input type="text" placeholder="Type" className="input" value={type} onChange={(e)=>setType(e.target.value)}/>
             <input type="text" placeholder="Category ID" className="input" value={cid} onChange={(e)=>setCid(e.target.value)}/>
             <input type="text" placeholder="Sub Category ID(Type 0 if does not exist)" className="input" value={scid} onChange={(e)=>setScid(e.target.value)}/>
             {/* <select name="Options" value={options}>
                <option value="1" onSelect={()=>setOptions(1)}>Large, medium, small</option>
                <option value="2" onSelect={()=>setOptions(2)}>One size</option>
             </select> */}
            {message && <Alert variant="success" style={{marginTop:'30px'}}>{message}</Alert>}

             <button className="btn" style={{ marginTop: "30px",
                    width: "30vw",
                    textAlign: "center",
                    backgroundColor: "#0E79BD",
                    border: "none",
                    borderRadius: "10px",
                    color: "white"}} onClick={handleSubmit}>Add item</button>

        </Container>
    )
}

export default AddSubCategory