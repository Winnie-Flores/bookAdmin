import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css'
export function Register(){
    const navigate=useNavigate()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [isAdmin,setIsAdmin] = useState(false)

    const handleRegister=async()=>{
      const userInfo={
        username:username,
        password:password,
      }
      try{
          const response = await fetch("http://8.148.22.219:8080/v1/register",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            
          },
          body:userInfo
          })
        const result = await response.json()
        if (response.status===200){
          alert("注册成功")
          
          navigate("/")
          
          
        }else{
          
          console.error("注册失败，状态码：",response.status)
          alert(`注册失败，原因：${response.statusText}`)
        }
      }catch(error){
        console.error("注册请求出错",error)
        alert("注册请求出错，请稍后再试")
      }
    }

    return(
        <div className='container'>
          <div className="head">
            <span className="title">图书管理系统</span>
            
          </div>
          <div className='card'>
            <form action="" method="get">
            <h1>注册</h1>
            <div>
              <label>用户名 : </label>
              <input 
                  type="text" 
                  className="inputBox" 
                  required
                  onChange={(e)=>setUsername(e.target.value)}></input>
            </div>
            <div className="password">
              <label>密 码 : </label>
              <input 
                  type="password" 
                  className="inputBox" 
                  required
                  onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <div className='adminChekBox'>
              <label>
                <input 
                    type="checkbox"
                    onChange={(e)=>setIsAdmin(e.target.checked)}>
                    </input>
                    注册为管理员
              </label>
            </div>
            <div className="loginBtn">
              <button onClick={handleRegister}>注册</button>
            </div>
            </form>
            </div>
        </div>  
    ) 
}

