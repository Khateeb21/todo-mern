
import './App.css';

import React, { useEffect } from 'react'
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home.jsx';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Signup from './components/signup/Signup.jsx';
import Signin from './components/signup/Signin.jsx';
import Todo from './components/todo/Todo.jsx';
import { useDispatch } from 'react-redux';
import { authActions } from './Store/index.js';


const App = () => {
 const  dispatch=useDispatch()
  useEffect(()=>{
const id =sessionStorage.getItem('id')
if(id){
dispatch(authActions.login())
}
  },[])
  return (
    <div>
      <Router>
      <Navbar/>
      <Routes>


     <Route  exact path='/' element={<Home/>}/>
     <Route  exact path='/about' element={<About/>}/>
     <Route  exact path='/signup' element={<Signup/>}/>
     <Route  exact path='/signin' element={<Signin/>}/>
     <Route  exact path='/todo' element={<Todo/>}/>
    
     </Routes>

        <Footer/>
        
      </Router>
    

     
   
    </div>
  )
}

export default App
