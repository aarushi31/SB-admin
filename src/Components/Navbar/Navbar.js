import React,{useReducer} from 'react'
import logo from '../../images/logo1.png'
import * as Rbs from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom'

// import {useDispatch, useSelector} from 'react-redux';
// import {selectUser} from '../../features/userSlice'
// import {logout} from '../../features/userSlice'
import './Navbar.css'

function Navbar() {

    //const [state, dispatch] = useReducer(reducer, initialState);
    //const login=state.loggedin;
    //console.log(state.loggedin)
    // const user=useSelector(selectUser)
    // const history=useHistory();
    // const dispatch=useDispatch();

    // const handleLogout=(e)=>{
    //   e.preventDefault();
      
    //   dispatch(logout())
    //   localStorage.removeItem('email');
    //   localStorage.removeItem('customer_id');
    //   localStorage.removeItem('loggedIn');
    //   //dispatch({ type: 'logout' });

    //   history.push('/login');
    // }
    // const showLogin=()=>{
      
    //   if(user && user.customer_id!==null){
    //     return(
    //       <div style={{display:'flex',width:'22vw',justifyContent:'space-between'}}>
    //       <span style={{width:'120px',background:'#0E79BD',color:'white',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',borderRadius:'25px'}}>
    //     <a href="/editprofile" style={{color:'white',textDecoration:'none'}}>My profile</a>
    //   </span>
    //   <span style={{width:'120px',background:'red',color:'white',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',borderRadius:'25px'}} onClick={(e)=>handleLogout(e)}>
    //     Logout
    //   </span>
    //   </div>
    //     )
    //   }
    //   else{
    //     return(
    //       <Rbs.Nav.Link href="/login" style={{width:'100px',background:'#0E79BD',color:'white',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'25px'}}>
    //     Login
    //   </Rbs.Nav.Link>
    //     )
    //   }
    // }
    return (
        // <>
        //     <Nav>
        //         <NavLink to="/">
        //             <img src={logo} alt="Logo" style={{width:"170px"}}/>
        //         </NavLink>
        //         <Bars/>
        //         <NavMenu>
        //             <NavLink to="/category" activeStyle>
        //                 Category
        //             </NavLink>
        //             <NavLink to="/faq" activeStyle>
        //                 FAQs
        //             </NavLink>
        //             <NavLink to="/cart" activeStyle>
        //                 My Cart
        //             </NavLink>
        //             <NavBtn>
        //             <NavBtnLink to="/login">Login</NavBtnLink>
        //             </NavBtn>
        //         </NavMenu>

        //     </Nav>
        // </>
        <Rbs.Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky='top'>
  <Rbs.Container>
  <Rbs.Navbar.Brand><a href="/"><img src={logo} style={{width:"170px"}}/></a></Rbs.Navbar.Brand>
  <Rbs.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Rbs.Navbar.Collapse id="responsive-navbar-nav">
    <Rbs.Nav className="me-auto">
      {/* <Rbs.Nav.Link href="#features">Features</Rbs.Nav.Link>
      <Rbs.Nav.Link href="#pricing">Pricing</Rbs.Nav.Link>
      <Rbs.NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <Rbs.NavDropdown.Item href="#action/3.1">Action</Rbs.NavDropdown.Item>
        <Rbs.NavDropdown.Item href="#action/3.2">Another action</Rbs.NavDropdown.Item>
        <Rbs.NavDropdown.Item href="#action/3.3">Something</Rbs.NavDropdown.Item>
        <Rbs.NavDropdown.Divider />
        <Rbs.NavDropdown.Item href="#action/3.4">Separated link</Rbs.NavDropdown.Item>
      </Rbs.NavDropdown> */}
    </Rbs.Nav>
    <Rbs.Nav>
      {/* <Rbs.Nav.Link href="/category" style={{color:'#0E79BD',fontWeight:'600',marginRight:'30px'}}>Category</Rbs.Nav.Link>
      <Rbs.Nav.Link href="/aboutus" style={{color:'#0E79BD',fontWeight:'600',marginRight:'30px'}}>About us</Rbs.Nav.Link>
      <Rbs.Nav.Link href="/cart" style={{color:'#0E79BD',fontWeight:'600',marginRight:'30px'}}>My Cart</Rbs.Nav.Link>
      <Rbs.Nav.Link href="/wishlist" style={{color:'#0E79BD',fontWeight:'600',marginRight:'30px'}}>Wishlist</Rbs.Nav.Link>
      <Rbs.Nav.Link href="/login" style={{width:'100px',background:'#0E79BD',color:'white',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'25px'}}>
         Login
    </Rbs.Nav.Link> */}
      
    </Rbs.Nav>
  </Rbs.Navbar.Collapse>
  </Rbs.Container>
</Rbs.Navbar>
    )
}

export default Navbar