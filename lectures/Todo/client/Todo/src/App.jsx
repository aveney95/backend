import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  // const [count, setCount] = useState(0)

  const [data, setData] = useState()
  const [newTodo, setNewTodo] = useState(
   { todo :"",
  created : Date.now()
}); //state for new todo input 

  useEffect(() => {

    axios({
      method: "get",
      url: "http://localhost:3000/gettodos"
    })
      .then(res => {
        console.log("res", res)
        setData(res.data)
      })
      .catch(err => console.log("err", err))


  }, [])

  //add new todo
  const handleAddTodo = () => {
    if(!newTodo.trim()) return; //stop adding empty todos
    const todoItem = {todo: newTodo, created: new Date()}
  }

  axios({
    method: "post",
    url: "http://localhost:3000/create",
    data: todoItem, 
  })
  .then((res) => {
    console.log("create:", res);
    setData([...data, res.data]); //update the list with the new item
  }) 
  .catch((err) => console.log("Error adding todo", err));


  return (
    <>

    <h1>ToDo List</h1>
    <div style={{marginBotton: "20px"}}>
      <input type="text"
      placeholder="Enter todo"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      style={{marginRight: "10px", padding: "5px"}} />
      <button onClick={handleAddTodo} style={{padding: "5px"}}>
        Add Todo
      </button>
    </div>

   



      {console.log("data", data)}

   
        {data && data.map((item) => {
          return (
            <div key={item.id} style={{ border: '2px solid red' }}>

            <p> {item.todo}</p>
            <button>delete</button>
            <button>edit</button>
         
            </div>
          )
        })}

    </>
  )
}

export default App
