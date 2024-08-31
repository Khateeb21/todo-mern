import React from 'react'

import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";


const TodoCards = ({title,body,ids,delid,disp}) => {
    return (
        <div className='p-3 todo-card'>

            <div>

                <h4> {title}</h4>
                <p className='todo-card-p'>{body}</p>
            </div>
            <div className='d-flex justify-content-around'>
                <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-2 'onClick={(e)=>{
                disp('block')
                }}>
                    <GrDocumentUpdate  className='cardicons'/>Update
                
                </div>
        <div className='d-flex justify-content-center align-items-center  card-icon-head' onClick={()=>(delid(ids))}>

        <MdDelete className='cardicons del' /> 
        </div>
        </div>
        </div>
    )
}

export default TodoCards
