import React,{useEffect} from 'react'
import './App.css';
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import Admin from './Components/Admin-panel/Admin'
import AddCategory from './Components/Edit/AddCategory';
import AddSubCategory from './Components/Edit/AddSubCategory';
import AddItem from './Components/Edit/AddItem'
import Order from './Components/Orders/Order';
import EditItem from './Components/Edit/EditItem';
import DelCategory from './Components/Edit/DelCategory';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Admin}/>
      <Route path="/add-category" component={AddCategory}/>
      <Route path="/add-subcategory" component={AddSubCategory}/>
      <Route path="/add-item" component={AddItem}/>
      <Route path="/order" component={Order}/>
      <Route path="/edit-items" component={EditItem}/>
      <Route path="/delete-category" component={DelCategory}/>
    </Switch>
    <Footer/>
    </>
  );
}

export default App;
