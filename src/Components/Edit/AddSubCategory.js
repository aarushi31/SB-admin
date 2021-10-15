import React, { useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import upload from '../../images/upload.png'
import './style.css'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'



function AddSubCategory() {

    const [files,setFiles]=useState([])
    

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
    const [cid,setCid]=useState()
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
    const postdata=JSON.stringify({
        "name":`${title}`,
        "image_url":url,
        "cid": parseInt(cid),

    })

    var config = {
        method: 'post',
        url: 'http://proffus.pythonanywhere.com/api/addSubCategory/',
        headers: { 
          'Authorization': 'Basic c2VhYmFza2V0b2ZmaWNpYWxAZ21haWwuY29tOlNlYWJhc2tldEAxMjM0', 
          'Content-Type': 'application/json'
        },
        data : postdata
      };

    


    const handleSubmit=(e)=>{
        e.preventDefault()




        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          if(response.data.success){
            setMessage('Sub category added successfully')
          }
          else{
              setMessage('Error adding sub category')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        
        setTitle('');
        setFiles([]);
        setCid();
        

    }

    

    return (
        <Container className="main-container">
             <center><h1 className="admin-heading">Add sub-category</h1></center>
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
             
             
             <input type="text" placeholder="Sub-Category name" className="input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
             
             <input type="text" placeholder="Category ID" className="input" value={cid} onChange={(e)=>setCid(e.target.value)}/>
            {message && <Alert variant="success">{message}</Alert>}

             <button className="btn" style={{ marginTop: "30px",
                    width: "30vw",
                    textAlign: "center",
                    backgroundColor: "#0E79BD",
                    border: "none",
                    borderRadius: "10px",
                    color: "white"}} onClick={handleSubmit}>Add sub-category</button>

                    

        </Container>
    )
}

export default AddSubCategory
