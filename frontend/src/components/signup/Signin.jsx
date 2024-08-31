import React,{useState} from 'react'
import "./signup.css"
import HeadingComp from './HeadingComp'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../Store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
const dispatch =useDispatch()
const history=useNavigate()
  const [inputs,setinputs]=useState({'usernameormail':'','password':''})


  const change=(e)=>{

    const {name,value}=e.target
    
    setinputs(prev=>({...prev,[name]:value}))
    
    }
    
    const submit=async(e)=>{
   
    e.preventDefault()
    
    await axios.post(`${window.location.origin}/api/v1/signin`,inputs).then((res)=>{
      console.log(res)
      if(res.data.message==="login Successful"){
          
        
         sessionStorage.setItem('id',res.data.others._id)
                
      history('/todo')
     dispatch(authActions.login())

      
      }else if(res.data.message==="Error: Authentication failed" || res.data.message==="Password incorrect"){

        toast.error(`${res.data.message}`)
    


      }

      
    })
    
    
    
    }

  return (
    <div>
        
       <div className="signup">

<div className="container">
  <ToastContainer/>

<div className="row">
<div className="col-lg-4 d-flex justify-content-center align-items-center  column col-right" >
    
    <HeadingComp first="Sign" second="In"/>
     </div>

<div className="col-lg-8 column d-flex justify-content-center align-items-center " > 
    <div className='d-flex flex-column gap-5 w-100' >
    <input type='username' name='usernameormail' placeholder=' Enter your Username Or Email' className='p-2' value={inputs.usernameormail} onChange={change}/>
    <input type='password' name='password' placeholder='Enter your Password' className='p-2' value={inputs.password} onChange={change}/>

    <button className='btns p-3' onClick={submit}>Sign In</button>
    </div>
</div>





</div>



</div>




</div>
    </div>
  )
}

export default Signin
