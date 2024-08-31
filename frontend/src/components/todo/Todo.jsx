import React, { useEffect, useState,useCallback } from 'react'
import './todo.css'
import TodoCards from './TodoCards'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';

const Todo = () => {
   
  let id = sessionStorage.getItem('id')
  
 
  
  console.log(id)
  const [inputs, Setinput] = useState({ title: '', body: '' })
  const [array, setarray] = useState([])
 const [indexx,setIndex]=useState('')

 const handleIndexClick = (index) => {
  setIndex(index); 
};

  const show = () => {

    const textArea = document.getElementById('textarea')
    textArea.style.display = 'block'

  }
  const change = (e) => {

    const { name, value } = e.target;


    Setinput(prev => ({ ...prev, [name]: value }))


  }
  const submit = useCallback(async () => {

    if (inputs.title === "" || inputs.body === "") {

      toast.error('your task title is empty and also the task body is empty !')
    }
    else {
      if (id) {


        await axios.post(`${window.location.origin}/api/v2/addTask`, { title: inputs.title, body: inputs.body, ID: id }).then((res) => {
          console.log(res)
        })


        Setinput(prev => ({ ...prev, title: '', body: '' }))
        toast.success('Your task is added')
      } else {




        Setinput(prev => ({ ...prev, title: '', body: '' }))

        toast.error('your task is not saved please Sign Up !')


      }
    }
  },[inputs])


  const fetch =useCallback(async () => {

 let datas=""
     if(id){
    await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`).then((res) => {

  
   datas=res.data.list
   

    })
  }
    setarray(prev=>([...datas]))

  },[array])

  
  useEffect(()=>{
  
  
  
    fetch()
  
  },[submit])

const del = (ids) => {






  setarray(prevDivs => prevDivs.filter((_, index) => {



    return (index !== ids)

  }));

  axios.delete(`${window.location.origin}/api/v2/deleteTask/${id}`,{params:{idss:array[ids]._id}}).then((res)=>{
    console.log(`deleted task  ${res}`)
  })
   
}


const dis = (value) => {

  const todo_update = document.querySelector('.todo-update')
  todo_update.style.display = value



}

return (
  <>
    <div className="todo ">
      <ToastContainer />
      <div className="todo-main container d-flex justify-content-center align-items-center my-5 flex-column w-50" >

        <div className="d-flex flex-column todo-input-div w-50">

          <input type='text' name='title' placeholder='Title' className='my-3 p-2 todo-input' onClick={show} onChange={change} value={inputs.title} />


          <textarea type='text' placeholder='Body' className='p-2 todo-input  ' name='body' id='textarea' onChange={change} value={inputs.body} />



        </div>
        <div className='w-50 d-flex justify-content-end my-2'>
          <button className='home-btn px-2 py-1 ' onClick={submit}>Add</button>

        </div>
      </div>

      <div className="todo-body">

        <div className="container-fluid">
          <div className="row">

            {

              array.map((item, index) => (
                <div className="col-lg-3 col-10 mx-5 my-2" key={index}  onClick={() => handleIndexClick(index)}>

                  <TodoCards title={item.title} body={item.body} ids={index} delid={del} disp={dis}  />
                
                </div>
             
              ))
              
            }
          </div>

        </div>

      </div>

    </div>
    <div className="todo-update">
      <div className="container">
        

      
      <Update disp={dis} arrays={array}  index={indexx} newFetch={fetch} dis={dis}
      />
  

      </div>
    </div>
  </>
)
  
}
export default Todo
