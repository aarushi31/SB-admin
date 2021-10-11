import React, { useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import upload from '../../images/upload.png'
import './style.css'
import {useDropzone} from 'react-dropzone'



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
    const [sellPrice,setSellPrice]=useState()
    const [origPrice,setOrigPrice]=useState()

    const handleSubmit=(e)=>{
        e.preventDefault()
        setMessage('Sub category added successfully')
        setTitle('');
        setFiles([])
        setSellPrice()
        setOrigPrice()

    }

    

    return (
        <Container className="main-container">
             <center><h1 className="admin-heading">Add item</h1></center>
             <div className="upload-box" {...getRootProps()}>
                 
                    <div>{images}</div>
                    <img src={upload} alt="upload image"/>
                    
                    {/* <span><input type="file" name="image"/></span> */}
                    
                    <input {...getInputProps()}/>
                    <span style={{marginLeft:'0'}}>Drop your file here</span>
                 
             </div>
             
             
             <input type="text" placeholder="Item name" className="input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
             <input type="text" placeholder="Sell Price" className="input" value={sellPrice} onChange={(e)=>setSellPrice(e.target.value)}/>
             <input type="text" placeholder="Original Price" className="input" value={origPrice} onChange={(e)=>setOrigPrice(e.target.value)}/>
             
            {message && <Alert variant="success">{message}</Alert>}

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