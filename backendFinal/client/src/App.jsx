import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./App.css"
import axios from 'axios'

function App() {

  const [data, setData] = useState()
  const [flag, setFlag] = useState(false)
  const [edit, setEdit] = useState({
    todo: ""
  })
  const [render, setRender] = useState(false)
  const [editItemId, setEditItemId] = useState(null);


  const [newToDo, setNewToDo] = useState(
    {
      todo: "",
      created: Date.now()
    }
  )


  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  const [register, setRegister] = useState({
    username: '',
    password: ''
  })

  const nav = useNavigate()
  
  const handleLogin = (e) => {
    console.log("login", e.target.value)
    setLogin(prev => {
      console.log("prev", prev)
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log(login)
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: login,
      withCredentials: true
    })
      .then(res => {
        console.log("res", res.data)
         
          if(res.data.msg === "good login"){

            // alert(`Welcome back : ${res.data.found.username}`)
            nav("/admin")
            
          }else {
            
            alert("BAD LOGIN")
          }
      })
      .catch(error => console.log(error))
  }
  const handleRegister = (e) => {
    console.log("reg", register)
    setRegister(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    console.log("reg", register)
    axios({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: register
    })
      .then(res => console.log("res", res.data))
      .catch(error => console.log(error))

//end of Auth
  }

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/gettodos"
    })
      .then(res => {
        setData(res.data)

      })
      .catch(err => console.log("err", err))

  }, [flag, render])

  const handleNewToDo = (e) => {


    setNewToDo((prev) => ({
      ...prev,
      todo: e.target.value
    }))


  }
  const handleSubmit = () => {


    axios({
      method: "post",
      url: "http://localhost:3000/create",
      data: newToDo

    })
      .then(res => {
        console.log("res", res)
        setNewToDo((prev) => ({
          ...prev,
          todo: ""
        }))
        setFlag(!flag)
      })
      .catch(err => console.log(err))

  }

  const handleDelete = (e) => {


    axios({
      method: "delete",
      url: `http://localhost:3000/delete/${e.target.id}`
    })
      .then(res => {
        setData((prev) => prev.filter((item) => item._id != res.data._id))
      })
      .catch(err => console.log(err))
  }

  const handleEdit = (e) => {
    setRender(!render)
    setEditItemId(e.target.id);
  }

  const handleEditSubmit = (e) => {
    axios({
      method: "put",
      url: `http://localhost:3000/edit/${e.target.id}`,
      data: edit
    })
      .then(res => {
        console.log("$$$$$$$$", res)
        setData((prev) => {
          return prev.map((item) => {
            if (item._id == res.data._id) {
              item.todo = res.data.todo
            }
            return item 
      })
    })
    setRender(!render)
  })
  .catch(err => console.log(err))
}

  const handleEditChange = (e) => {
    setEdit({ todo: e.target.value })
  }

  

  return (
    <>
      <p>Final</p>
      <div id='login'>
        {console.log("login", login)}
        {console.log("Reg", register)}
        <h1>Login</h1>
        <input id='username' onChange={(e) => handleLogin(e)} type='text' placeholder='Username' />
        <br />
        <br />
        <input id="password" onChange={(e) => handleLogin(e)} type='text' placeholder='Password' />
        <br />
        <br />
        <button onClick={(e) => handleLoginSubmit(e)}>Login</button>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <div id='register'>
        <h1>Register</h1>
        <input id='username' onChange={(e) => handleRegister(e)} type='text' placeholder='Username' />
        <br />
        <br />
        <input id='password' onChange={(e) => handleRegister(e)} type='text' placeholder='Password' />
        <br />
        <br />
        <button onClick={(e) => handleRegisterSubmit(e)}>Register</button>
        <br />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={newToDo.todo}
          onChange={(e) => handleNewToDo(e)} />

        <button onClick={(e) => handleSubmit(e)}>New Todo</button>
      </div>

      {data && data.sort((a, b) => b.created - a.created).map((item) => {
        return (

          <div key={item._id} style={{ marginBottom: "20px" }}>

            <div id={item._id} style={{ border: '2px solid black' }}>


              {render && editItemId == item._id
                ?
                (
                  <div>
                    <input
                      defaultValue={item.todo || ""}
                      id={item._id}
                      onChange={(e) => handleEditChange(e)}
                    >
                    </input>

                    <button
                      id={item._id}
                      onClick={(e) => handleEditSubmit(e)}
                    >
                      Submit
                    </button>

                  </div>
                )
                :
                (
                  <p> {item.todo}</p>
                )
              }

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button id={item._id} onClick={(e) => handleDelete(e)}>delete</button>
                <button id={item._id} onClick={(e) => handleEdit(e)}>edit</button>

              </div>
            </div>
          </div>
        )
      })}

    </>
  )
}


export default App