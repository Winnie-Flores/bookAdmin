import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export function Addbook(){
    const [book,setBook]= useState({})
    const navigate= useNavigate()

    const handleReturn=(()=>{
        navigate(`/admin`)
    })
    const handleDropOut=(()=>{
        navigate(`/`)
    })
    const handleAddSave=async()=>{
        try{
            const response=await fetch("http://8.148.22.219:8080/v1/admin",{
                method:"POST",
                headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify(book)
            })
            const result = await response.json()
            if(response.status===200){
                const fetchData=async()=>{
                    const response= await fetch("http://8.148.22.219:8080/v1/admin",{
                        method:"GET"
                    })
                    const updatedData= await response.json()
                    if(response.status===200){
                        setBook(updatedData)
                        navigate("/admin")
                    }else{
                        console.error("获取书籍列表失败，状态码：",response.status)
                        alert(`获取书籍列表失败,原因：${response.statusText}}`)
                    }
                }
                fetchData()
                navigate("/admin")
               
            }else{
                console.error("添加书籍失败，状态码：",response.status)
                alert(`添加书籍失败,原因：${response.statusText}`)
            }
                
        }catch(error){
            console.error("添加书籍请求出错",error)
            alert("添加书籍请求出错，请稍后再试")
        }
     
     }

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
            <h2>添加书籍信息</h2>
            <div>
            <label>书名：</label>
            <input type="text" className='inputBox' value={book.name} onChange={(e)=>setBook({...book,name:e.target.value})}></input>
            </div>
            <div>
            <label>作者：</label>
            <input type="text" className='inputBox' value={book.author}  onChange={(e)=>setBook({...book,author:e.target.value})}></input>
            </div>
            <div>
            <label>类别：</label>
            <input type="text" className='inputBox'  value={book.category} onChange={(e)=>setBook({...book,category:e.target.value})}></input>
            </div>
            <div>
            <label>借阅状态：</label>
            <input type="checkbox" className='checkbox' value={book.is_lent} onChange={(e)=>setBook({...book,is_lent:e.target.checked})}></input>
            </div>
            <div className="saveAddBtn">
            <button onClick={handleAddSave}>保存</button>
            </div>
        </div>
    </div>
    )
}