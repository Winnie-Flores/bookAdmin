import { useState } from "react";
import './login.css'
import { useNavigate } from "react-router-dom";
//import { Navigate, useNavigate } from 'react-router-dom';


export function Login({ setIsLoggedIn, setUserRole }){
    const navigate=useNavigate()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const handleLogin = async()=>{
        const userInfo ={
            username:username,
            password:password
        };
        try {
            const response = await fetch("http://8.148.22.219:8080/v1/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    'Authorization':localStorage.getItem('token')
                },
                body:JSON.stringify(userInfo)
            })
            const result= await response.json()
            if(response.status===200){
                setIsLoggedIn(true)
                setUserRole(result.role)
                if (result.role==="admin"){
                    navigate('/admin')
                }else{
                    navigate('/user')
                }
                localStorage.setItem("user",JSON.stringify({role:result.role}))
            }else{
                if(response.status===400){
                    alert("登录失败，可能是用户名或密码错误，请稍后再试")
                }else if(response.status===401){
                    alert("登录失败，权限验证不通过，请确认账号信息")
                }else{
                    console.error("登录失败，状态码：",response.status)
                    alert(`登录失败，原因：${response.statusText}`)
                }
                
            }
        }catch(error){
            console.error("登录请求出错#:", error.name, error.message, error.stack);
            alert("登录请求出错，请稍后再试");
        }      
    }
    const handleIntoRegister = ()=>{
        navigate('/register')
    }
    return(
        <div className="container">
        <div className="head">
            <span className="title">图书管理系统</span>
        </div>
        <div className="card">
        <h1>图书管理系统</h1>
        
        <div className="loginName">
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
        
        <div className="loginBtn">
            <button onClick={handleLogin}>登录</button>
            <button onClick={handleIntoRegister}>注册</button>
        </div>
        </div>
        
        
    </div>
    )
    
}

