import React, { useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import upload from '../../images/upload.png'
import './style.css'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'


function AddSubCategory() {

    const [files,setFiles]=useState([])
    
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
        getUrl()
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
    const [origPrice1,setOrigPrice1]=useState()
    const [origPrice2,setOrigPrice2]=useState()
    const [origPrice3,setOrigPrice3]=useState()
    const [inStock,setInstock]=useState("In stock")
    const [desc,setDesc]=useState('');
    const [specif,setSpeci]=useState('');
    const [type,setType]=useState('');
    const [options,setOptions]=useState(1);
    const [cid,setCid]=useState();
    const [scid,setScid]=useState();
    const [optionsData,setOptionsdata]=useState({});
    const [w1,setw1]=useState();
    const [w2,setw2]=useState();
    const [w3,setw3]=useState();
    const [p1,setp1]=useState();
    const [p2,setp2]=useState();
    const [p3,setp3]=useState();

    
    

    



    

    
    var data = JSON.stringify({
      "name": title,
      "image_url": url,
      "in_stock": Boolean(inStock),
      "description": desc,
      "specification": specif,
      "Type": type,
      "scid":scid,
      "options": {
        "1": {
          "name": `Small ${w3}`,
          "after_sale_price": parseInt(p3),
          "actual_price": parseInt(origPrice3)
        },
        "2": {
          "name": `Medium ${w2}`,
          "after_sale_price": parseInt(p2),
          "actual_price": parseInt(origPrice2)
        },
        "3": {
          "name": `Large ${w1}`,
          "after_sale_price": parseInt(p1),
          "actual_price": parseInt(origPrice1)
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
            setTitle('');
            setFiles([]);
            setType('');
            setCid();
            setScid();
            setDesc('');
            setInstock();
            
          }
          else{
              setMessage('Error adding item')
          }
        })
        .catch(function (error) {
          console.log(error);
        });


        

        
    }

    

    return (
        <Container className="main-container">
             <center><h1 className="admin-heading">Add item</h1></center>
             <div className="upload-box" {...getRootProps()}>
                 
                    <div>{images}</div>
                    <img src={upload} alt="upload image"/>
                    
                    
                    
                    <input {...getInputProps()}/>
                    <span style={{marginLeft:'0'}}>Drop your file here</span>
                    {/* <button className="btn" style={{ marginTop: "30px",
                    width: "20vw",
                    textAlign: "center",
                    backgroundColor: "#0E79BD",
                    border: "none",
                    borderRadius: "10px",
                    color: "white"}} onClick={getUrl}>Submit photo</button> */}
                 
             </div>
             
             
             <input type="text" placeholder="Item name" className="input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
             
             
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
             <div className="options-container">
               <span>Large</span>
               <input type="text" placeholder="Weight" className="input" value={w1} onChange={(e)=>setw1(e.target.value)}/>
               <input type="text" placeholder="After sale price" className="input" value={p1} onChange={(e)=>setp1(e.target.value)}/>
               <input type="text" placeholder="Original Price" className="input" value={origPrice1} onChange={(e)=>setOrigPrice1(e.target.value)}/>
               <span>Medium</span>
               <input type="text" placeholder="Weight" className="input" value={w2} onChange={(e)=>setw2(e.target.value)}/>
               <input type="text" placeholder="After sale price" className="input" value={p2} onChange={(e)=>setp2(e.target.value)}/>
               <input type="text" placeholder="Original Price" className="input" value={origPrice2} onChange={(e)=>setOrigPrice2(e.target.value)}/>
               <span>Small</span>
               <input type="text" placeholder="Weight" className="input" value={w3} onChange={(e)=>setw3(e.target.value)}/>
               <input type="text" placeholder="After sale price" className="input" value={p3} onChange={(e)=>setp3(e.target.value)}/>
               <input type="text" placeholder="Original Price" className="input" value={origPrice3} onChange={(e)=>setOrigPrice3(e.target.value)}/>
             </div>
             
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