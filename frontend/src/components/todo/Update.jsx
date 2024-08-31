import React,{useState} from 'react'
import './todo.css'
import axios from 'axios'


const Update = ({disp,arrays,index,newFetch,dis}) => {



  let id = sessionStorage.getItem('id')
  const [inputs,setInputs]=useState({title:'',body:''})
  
  const change=(e)=>{

    const {name,value}=e.target
    
    setInputs(prev=>({...prev,[name]:value}))
    
    }

    const Updated=()=>{

      axios.put(`${window.location.origin}/api/v2/updateTask/${id}`,{idss:arrays[index]._id,inputs}).then((res)=>{
        console.log(`updated task  ${res}`)
        newFetch()
        setInputs(prev => ({
          ...prev,
          title: '',
          body: ''
        }));
        dis("none")
      })


    }
  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update' >
    <h3 className='update-task'>Update your task</h3>
    <input type="text" name="title" id="" placeholder='Enter text to update Title' className='todo-input-div my-4 w-100 p-3' onChange={change} value={inputs.title}/>
    <textarea name="body" id="" className='todo-input-div w-100 p-3' placeholder='Enter text to update body' onChange={change} value={inputs.body}/>
 <div>

 <button className='btn btn-dark my-4'onClick={Updated}>Update</button>
 <button className='btn btn-danger my-4 mx-3'onClick={()=>{
                disp('none')
                }}>  Close</button>
 </div>
    </div>
  )
}

export default Update
