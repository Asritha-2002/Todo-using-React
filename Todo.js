import React, { useState } from "react";

const Todo =()=>{
const [data,setData]=useState({
    text:"",
    id:""
})
const [list,setList]=useState([])
const [edit,setEdit]=useState({
    id:"",
    isEdit:false
})
const changeData=(e)=>{
    setData({
        ...data,
        text:e.target.value,
        
    })
    
}
const handleSubmit=()=>{
let newTodo={
    text:data.text,
    id:new Date().getTime().toString()
}
setList([
    ...list,
    newTodo
])
setData({
    ...data,
    text:'',
    id:''
})
}
const handleDelete=(comingId)=>{
    const filteredElements=list.filter((eachElement)=>{
        return eachElement.id !== comingId
    })
    setList(filteredElements)
}
const handleEdit=(id)=>{
    setEdit({
        ...edit,
        isEdit:true,
        id:id
    })
    const edited=list.find((eachElement)=>{
        return eachElement.id === id
    })
    setData({
        ...data,
        text:edited.text,
        id:edited.id
    })
}
const handleEditing=(e)=>{
    e.preventDefault();
    let edited=list.map((eachElement)=>{
        if(eachElement.id === edit.id){
            return {
                text:data.text,
                id:data.id
            }
        }else{
            return eachElement;
        }
    })

setList(edited);
setData({
    ...data,
    text:'',
    id:''
})
setEdit({
    id:'',
    isEdit:false
})
}
    return(<div>
        <div class="form-fields">
        <input type="text"
        placeholder="enter your todo"
        value={data.text}
        onChange={changeData}
        required
        />{
            edit.isEdit ?  <button onClick={handleEditing}>Edit</button>: <button onClick={handleSubmit}>Add</button>
        }
       </div>
        <hr/>
        { list.length === 0 ? <h4>List contains ZERO elements</h4> :
        <ul type="none">
            {
                list.map((eachElement,index)=>{
                    const {text,id}=eachElement;
                    return(
                        <li key={index}>
                            <div>{text}
                            <button onClick={()=>handleEdit(id)} className="edit">Edit</button>
                            <button onClick={()=>handleDelete(id)} className="delete">Delete</button></div><br/>
                        </li>
                    )
                })
            }
        </ul>
}
    </div>)
}
export default Todo