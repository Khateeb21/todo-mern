import React from 'react'
import "./Navbar.css"
import { GoBook } from "react-icons/go";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
const history=useNavigate()
  const dispatch=useDispatch()
  const isLoggedin=useSelector((state)=>state.isLoggedIn)
const logout=()=>{
sessionStorage.clear()
dispatch(authActions.logout()) 
history("/signin")

}
  console.log(isLoggedin)
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body  navbackground" >
  <div className="container white">
    <Link className="navbar-brand " to="/"><b><GoBook /> &nbsp;TODO</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item mx-1">
        <Link className="nav-link active" aria-current="page" to="/about">About</Link>
        </li>
        <li className="nav-item mx-2">
        <Link className="nav-link active" aria-current="page" to="/todo">todo</Link>
        </li>
     {!isLoggedin &&<> 
     
      <li className="nav-item mx-2">
        <Link className="nav-link active btn-nav" aria-current="page" to="/signup">Sign up</Link>
        </li>
        <li className="nav-item mx-2">
        <Link className="nav-link active btn-nav" aria-current="page" to="/signin">Sign in</Link>
        </li>
      
     
     </>}
     
     {isLoggedin && 
     
     <li className="nav-item mx-2"    onClick={logout}>
     <Link className="nav-link active btn-nav" aria-current="page" to="#">logout</Link>
  
     </li>

     }
      </ul>
     
        
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
