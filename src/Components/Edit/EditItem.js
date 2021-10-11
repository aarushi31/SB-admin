import React, { useState } from 'react'
import { Container, FormControl,Button,Modal, Alert } from 'react-bootstrap'
import katla from '../../images/katla.jpg'
import './style.css'
import upload from '../../images/upload.png'
import {useDropzone} from 'react-dropzone'


function MyVerticallyCenteredModal(props) {
    const [files,setFiles]=useState([])
    

    

    

    const [title,setTitle]=useState(props.title);
    const [sellPrice,setSellPrice]=useState(props.sellPrice);
    const [origPrice,setOrigPrice]=useState(props.origPrice);

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

    const handleSubmit=(e)=>{
        e.preventDefault()
        setMessage('Item edited successfully')
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
                 
                 {/* <span><input type="file" name="image"/></span> */}
                 
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

    return (
        <Container>
            <center><h1 className="admin-heading">Edit/Delete Items</h1></center>
            <div className="products">
                <div className="product">
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
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title="Catla"
                sellPrice="₹ 490.00"
                origPrice="₹ 590.00"
            />
        </Container>
    )
}

export default EditItem
