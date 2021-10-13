import React, { useEffect, useState } from 'react'
import { Container, FormControl,Button,Modal, Alert } from 'react-bootstrap'
import katla from '../../images/katla.jpg'
import './style.css'
import upload from '../../images/upload.png'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'


function MyVerticallyCenteredModal(props) {
    
    const [detail,setDetail]=useState({});

    const [title,setTitle]=useState();
    const [sellPrice,setSellPrice]=useState();
    const [origPrice,setOrigPrice]=useState();
    const [desc,setDesc]=useState();
    const [speci,setSpeci]=useState();
    const [type,setType]=useState();
    const [instock,setInstock]=useState("In stock");

    let pid=localStorage.getItem('pid');
    

    useEffect(()=>{
        
        axios.post(`http://proffus.pythonanywhere.com/api/getProduct/p_id/${pid}`)
        .then(res=>{
            console.log(res.data.Detail.name)
            setDetail(res.data.Detail);
            console.log(detail)
            setTitle(res.data.Detail.name);
            setSellPrice(res.data.Detail.after_sale_price)
            setOrigPrice(res.data.Detail.actual_price);
            setDesc(res.data.Detail.description);
            setSpeci(res.data.Detail.specification);
            setType(res.data.Detail.Type)
            if(detail.in_stock==="1"){
                setInstock(true);
            }
            else{
                setInstock(false)
            }
            console.log(title)
        })
        .catch(err=>{
            console.log(err)
        })
    },[props.onHide])
    
    


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

    

    var data = JSON.stringify({
        "name": title,
        "image_url": "https://url/url",
        "after_sale_price": parseInt(sellPrice),
        "actual_price": parseInt(origPrice),
        "in_stock": Boolean(instock),
        "description": desc,
        "specification": speci,
        "Type": type,
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
        "pid": pid
      });
      
      var config = {
        method: 'post',
        url: 'http://proffus.pythonanywhere.com/api/editProduct/',
        headers: { 
          'Authorization': 'Basic c2VhYmFza2V0b2ZmaWNpYWxAZ21haWwuY29tOlNlYWJhc2tldEAxMjM0', 
          'Content-Type': 'application/json'
        },
        data : data
      };


    const handleSubmit=(e)=>{
        e.preventDefault()

        axios(config)
        .then(function (response) {
            setMessage('Item edited successfully')
            console.log(JSON.stringify(response.data));
            localStorage.removeItem('pid');
        })
        .catch(function (error) {
        console.log(error);
        setMessage('Error editing item')
        });
        
        setFiles([])
        setTimeout(()=>{
            setMessage('')
        },2000)

        

    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p> */}
          <center>
          <div className="upload-box" {...getRootProps()}>
                 
                 <div>{images}</div>
                 <img src={upload} alt="upload image"/>
                 
                 <span><input type="file" name="image"/></span>
                 
                 <input {...getInputProps()}/>
                 <span style={{marginLeft:'0'}}>Drop your file here</span>
              
          </div>
          </center>
          <FormControl
            placeholder="Item name"
            aria-label="Item name"
            aria-describedby="basic-addon2"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{marginTop:'20px'}}
        />
            <FormControl
            placeholder="Sell Price"
            aria-label="Sell Price"
            aria-describedby="basic-addon2"
            value={sellPrice}
            onChange={(e)=>setSellPrice(e.target.value)}
        />
            <FormControl
            placeholder="Original Price"
            aria-label="Original Price"
            aria-describedby="basic-addon2"
            value={origPrice}
            onChange={(e)=>setOrigPrice(e.target.value)}
        />
         <FormControl
            placeholder="Specification"
            aria-label="Specification"
            aria-describedby="basic-addon2"
            value={speci}
            onChange={(e)=>setSpeci(e.target.value)}
        />
         <FormControl
            placeholder="Description"
            aria-label="Description"
            aria-describedby="basic-addon2"
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
        />
         <FormControl
            placeholder="Type"
            aria-label="Type"
            aria-describedby="basic-addon2"
            value={type}
            onChange={(e)=>setType(e.target.value)}
        />

        <select name="In stock" value={instock} className="input" defaultValue="In stock" onChange={(e)=>setInstock(e.target.value)}>
                <option value="In stock">In stock</option>
                <option value="true">yes</option>
                <option value="false">no</option>
            </select>
         

        </Modal.Body>
        <Modal.Footer>
            {message && <Alert variant="success">{message}</Alert>}
          <Button onClick={handleSubmit}>Save Changes</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }




function EditItem() {

    const [modalShow, setModalShow] = useState(false);
    const [products,setProducts]=useState([])

    

    useEffect(()=>{
        axios.post('http://proffus.pythonanywhere.com/api/products/')
        .then(res=>{
            console.log(res);
            setProducts(res.data.Products);
            console.log(products);
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const [reload,setreload]=useState(false)
    const handleDelete=(pid,e)=>{
        e.preventDefault();
        localStorage.setItem('pid',pid)
        var data = JSON.stringify({
            "pid": parseInt(localStorage.getItem('pid'))
        });

        var config = {
            method: 'post',
            url: 'http://proffus.pythonanywhere.com/api/deleteProduct/',
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

    //var Pid;

    const openModal=(pid,e)=>{
        e.preventDefault()
        setModalShow(true)
        localStorage.setItem('pid',pid)
        //Pid=parseInt(pid)
    }

    

    return (
        <Container>
            <center><h1 className="admin-heading">Edit/Delete Items</h1></center>
            <div className="products">
                {products.map((product,idx)=>{
                    return(
                        <div className="product" key={idx}>
                            <img src={katla} alt="product-image"/>
                            <span>{product.name}</span>
                            <span>₹ {product.after_sale_price}</span>
                            <span>₹ {product.actual_price}</span>
                            <div className="edit-buttons">
                                <p className="edit" onClick={(e) => openModal(product.pid,e)}>Edit Item</p>
                                <p className="delete" onClick={(e)=>handleDelete(product.pid,e)}>Delete item</p>
                            </div>
                        </div>
                    )
                })}
                
                {/* <div className="product">
                    <img src={katla} alt="product-image"/>
                    <span>Catla</span>
                    <span>₹ 490.00</span>
                    <span>₹ 590.00</span>
                    <div className="edit-buttons">
                        <p className="edit" onClick={() => setModalShow(true)}>Edit Item</p>
                        <p className="delete">Delete item</p>
                    </div>
                </div>
                <div className="product">
                    <img src={katla} alt="product-image"/>
                    <span>Catla</span>
                    <span>₹ 490.00</span>
                    <span>₹ 590.00</span>
                    <div className="edit-buttons">
                        <p className="edit">Edit Item</p>
                        <p className="delete">Delete item</p>
                    </div>
                </div>
                <div className="product">
                    <img src={katla} alt="product-image"/>
                    <span>Catla</span>
                    <span>₹ 490.00</span>
                    <span>₹ 590.00</span>
                    <div className="edit-buttons">
                        <p className="edit" >Edit Item</p>
                        <p className="delete">Delete item</p>
                    </div>
                </div> */}
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                
            />
        </Container>
    )
}

export default EditItem
