import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './editbook.css'

export function Editbook(){
  const {bookId}=useParams();
  const [book,setBook]=useState({})   
  const navigate= useNavigate()
  useEffect(()=>{
    const fetchBookData = async()=>{
        try{
            const response = await fetch(`http://8.148.22.219:8080/v1/admin/${bookId}`,{
                method:"GET"
            })
            const result = await response.json()
            if (response.status===200){
                setBook(result)
            }else{
                console.error("获取书籍详情失败",result.msg)
                alert("获取书籍详情失败")
            }
        }catch(error){
            console.error("获取书籍详情请求失败",error)
            alert("获取书籍详情请求失败，请稍后再试")
        }
    }
    fetchBookData()
    
  },[bookId])

  const handleSave=async()=>{
    try{
        const response=await fetch("http://8.148.22.219:8080/v1/admin",{
            method:"PUT",
            headers:{
                "Content-Type":"application.json"
            },
            body:JSON.stringify(book)
        })
        const result=await response.json()
        if(response.status===200){
            const fetchUpdatedData=async()=>{
                const response=await fetch("http://8.148.22.219:8080/v1/admin",{
                    method:"GET"
                })
                const updatedData =await response.json()
                if (response.status===200){
                    setBook(updatedData)
                    navigate("/admin")
                }else{
                    console.error("重新获取书籍列表失败",error)
                    alert("重新获取书籍列表失败")
                }
            
            }
            fetchUpdatedData()
        }else{
            console.error("编辑书籍失败",result.msg)
            alert("编辑失败")
        }
    }catch(error){
        console.error("编辑书籍请求出错",error)
        alert("编辑书籍请求出错，请稍后再试")
    }
  }
 
 const handleDropOut=(()=>{
    navigate(`/`)
  })
  const handleReturn=(()=>{
    navigate(`/admin`)
  })

 return(
    <div className="container">
        <div className="head">
            <span className="title">图书管理系统</span>
            <span>
                <button className="dropOut" onClick={handleReturn}>返回</button>
            </span>
            <span>
              <button className="dropOut" onClick={handleDropOut}>退出</button>
            </span>
        </div>
        <div className="editCard">
            <h2>编辑书籍信息</h2>
            <div>
            <label>书名：</label>
            <input type="text" className='inputBox' value={book.name} onChange={(e)=>setBook({...book,name:e.target.value})}></input>
            </div>
            <div>
            <label>作者：</label>
            <input type="text" className='inputBox' value={book.author} onChange={(e)=>setBook({...book,author:e.target.value})}></input>
            </div>
            <div>
            <label>类别：</label>
            <input type="text" className='inputBox' value={book.category} onChange={(e)=>setBook({...book,category:e.target.value})}></input>
            </div>
            <div>
            <label>借阅状态：</label>
            <input type="checkbox" className='checkbox' value={book.is_lent} onChange={(e)=>setBook({...book,is_lent:e.target.checked})}></input>
            </div>
            <div className="saveBtn">
            <button onClick={handleSave}>保存</button>
            </div>
        </div>
    </div>
 )
}
 