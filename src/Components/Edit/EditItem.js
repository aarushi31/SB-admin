import React, { useEffect, useState } from 'react'
import { Container, FormControl,Button,Modal, Alert } from 'react-bootstrap'
import katla from '../../images/katla.jpg'
import './style.css'
import upload from '../../images/upload.png'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'
import { useHistory } from 'react-router'


function MyVerticallyCenteredModal(props) {
    
    const [detail,setDetail]=useState({});

    const [title,setTitle]=useState();
    const [sellPrice,setSellPrice]=useState();
    const [origPrice,setOrigPrice]=useState();
    const [desc,setDesc]=useState();
    const [speci,setSpeci]=useState();
    const [type,setType]=useState();
    const [instock,setInstock]=useState("In stock");
    const [w1,setw1]=useState();
    const [w2,setw2]=useState();
    const [w3,setw3]=useState();
    const [p1,setp1]=useState();
    const [p2,setp2]=useState();
    const [p3,setp3]=useState();
    const [origPrice1,setOrigPrice1]=useState()
    const [origPrice2,setOrigPrice2]=useState()
    const [origPrice3,setOrigPrice3]=useState()
    const [url,setUrl]=useState('');

    let pid=localStorage.getItem('pid');
    

    useEffect(()=>{
        
        axios.post(`http://proffus.pythonanywhere.com/api/getProduct/p_id/${pid}`)
        .then(res=>{
            console.log(res.data.Detail.name)
            setDetail(res.data.Detail);
            console.log(detail)


            setTitle(res.data.Detail.name);
            setUrl(res.data.Detail.image_url)

            setp1(res.data.Detail.options[2].after_sale_price)
            setp2(res.data.Detail.options[1].after_sale_price)
            setp3(res.data.Detail.options[0].after_sale_price)

            setOrigPrice1(res.data.Detail.options[2].actual_price)
            setOrigPrice2(res.data.Detail.options[1].actual_price)
            setOrigPrice3(res.data.Detail.options[0].actual_price)

            let str=res.data.Detail.options[2].name;
            let str2=res.data.Detail.options[1].name;
            let str3=res.data.Detail.options[0].name;
            setw1(str.substr(str.indexOf(' ')+1))
            setw2(str2.substr(str2.indexOf(' ')+1))
            setw3(str3.substr(str3.indexOf(' ')+1))


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

    

    var data = JSON.stringify({
        "name": title,
        "image_url": url,
        "in_stock": Boolean(instock),
        "description": desc,
        "specification": speci,
        "Type": type,
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
          </center>
          <FormControl
            placeholder="Item name"
            aria-label="Item name"
            aria-describedby="basic-addon2"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{marginTop:'20px'}}
        />
        <label style={{marginTop:'30px'}}>Large</label>
        <FormControl
            placeholder="Weight"
            aria-label="Weight"
            aria-describedby="basic-addon2"
            value={w1}
            onChange={(e)=>setw1(e.target.value)}
        />
            <FormControl
            placeholder="Sale Price"
            aria-label="Sale Price"
            aria-describedby="basic-addon2"
            value={p1}
            onChange={(e)=>setp1(e.target.value)}
        />
            <FormControl
            placeholder="Original Price"
            aria-label="Original Price"
            aria-describedby="basic-addon2"
            value={origPrice1}
            onChange={(e)=>setOrigPrice1(e.target.value)}
        />


<label style={{marginTop:'30px'}}>Medium</label>
        <FormControl
            placeholder="Weight"
            aria-label="Weight"
            aria-describedby="basic-addon2"
            value={w2}
            onChange={(e)=>setw2(e.target.value)}
        />
            <FormControl
            placeholder="Sale Price"
            aria-label="Sale Price"
            aria-describedby="basic-addon2"
            value={p2}
            onChange={(e)=>setp2(e.target.value)}
        />
            <FormControl
            placeholder="Original Price"
            aria-label="Original Price"
            aria-describedby="basic-addon2"
            value={origPrice2}
            onChange={(e)=>setOrigPrice2(e.target.value)}
        />

        <label style={{marginTop:'30px'}}>Small</label>
        <FormControl
            placeholder="Weight"
            aria-label="Weight"
            aria-describedby="basic-addon2"
            value={w3}
            onChange={(e)=>setw3(e.target.value)}
        />
            <FormControl
            placeholder="Sale Price"
            aria-label="Sale Price"
            aria-describedby="basic-addon2"
            value={p3}
            onChange={(e)=>setp3(e.target.value)}
        />
            <FormControl
            placeholder="Original Price"
            aria-label="Original Price"
            aria-describedby="basic-addon2"
            value={origPrice3}
            onChange={(e)=>setOrigPrice3(e.target.value)}
        />


         <FormControl
            placeholder="Specification"
            aria-label="Specification"
            aria-describedby="basic-addon2"
            value={speci}
            style={{marginTop:'30px'}}
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

        <label style={{marginTop:'30px'}}>In stock</label>
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
    const [products,setProducts]=useState([]);
    const history=useHistory()

    

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
            history.push('/')
            
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
                            <img src={product.image_url} alt="product-image"/>
                            <span>{product.name}</span>
                            <span>₹ {product.options[1].after_sale_price}</span>
                            <span>₹ {product.options[1].actual_price}</span>
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
