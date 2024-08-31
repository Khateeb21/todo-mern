import React, { useState } from 'react'
import "./signup.css"
import HeadingComp from './HeadingComp'
import  axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const history=useNavigate()

const [inputs,setinputs]=useState({'email':"",'username':'','password':''})

const change=(e)=>{

const {name,value}=e.target

setinputs(prev=>({...prev,[name]:value}))

}

const submit=async(e)=>{


e.preventDefault()

await axios.post(`${window.location.origin}/api/v1/register`,inputs).then((res)=>{
  if(res.data.message==='user already exists'){
alert(res.data.message)
  }
  else{
    alert(res.data.message)
setinputs(prev=>({
  ...prev,'email':"",'username':'','password':''
  
  }))
  history('/signin')
}
})



}

  return (
   
  <div className="signup">

<div className="container">

<div className="row">

<div className="col-lg-8 column d-flex justify-content-center align-items-center col-res " > 
    <div className='d-flex flex-column gap-5 w-100' ><input type='email'name='email' placeholder='Enter your Email' className='p-2' onChange={change} value={inputs.email}/>
    <input type='username' name='username' placeholder=' Enter your Username' className='p-2' onChange={change} value={inputs.username}/>
    <input type='password' name='password' placeholder='Enter your Password' className='p-2' onChange={change} value={inputs.password}/>

    <button className='btns p-3' onClick={submit}>Sign up</button>
    </div>
</div>
<div className="col-lg-4 d-flex justify-content-center align-items-center  column col-left  signup-res" >
    
   <HeadingComp first="Sign" second="Up"/>
    
    
    </div>




</div>



</div>




</div>



 
 
  )
}

export default Signup
