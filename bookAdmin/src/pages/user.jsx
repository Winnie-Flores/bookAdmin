import { useState ,useEffect} from "react";
import './user.css'
import { useNavigate } from "react-router-dom";
export function User(){
    const [name,setName] = useState('')
    const [author,setAuthor] = useState('')
    const [data,setData] = useState([])

    const navigate=useNavigate()
    const handleDropOut=(()=>{
      navigate(`/`)
    })

    useEffect(()=>{
        const fetchData = async()=>{
          try{
            
            const response = await fetch ("http://8.148.22.219:8080/v1/user",{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
                'Authorization':localStorage.getItem('token')
              }
            })
            const result = await response.json()
            if (response.status===200){
              setData(result)
            }else{
              console.error("获取书籍列表失败，状态码：",response.status)
              alert(`获取书籍列表失败，原因：${response.statusText}`)
            }
          }catch(error){
            console.error("获取书籍列表请求出错，状态码：",error)
            alert(`获取书籍列表请求出错，请稍后再试`)
          }
        }
        fetchData()
      },[])
    const handleSearch=(()=>{
        try{
          const searchTarget={
            name:name,
            author:author
          }
          const res = data.filter((bookItem)=>{
            return(bookItem.name==searchTarget.name || 
            bookItem.author==searchTarget.author)
          })
          setData(res)
        }catch(error){
          console.error('搜索出错',error);
          alert('搜索出错')
        }
      })
    return (
    
        <div className="container">
          <div className="head">
            <span className="title">图书管理系统</span>
            <span>
              <button className="dropOut" onClick={handleDropOut}>退出</button>
            </span>
          </div>
          <div className="below">
            <div className="search">
              <span >
              <label>书名：</label>
              <input type="text" className="inputBox" onChange={(e)=>setName(e.target.value)}></input>
              </span>
              <span>
              <label>作者：</label>
              <input type="text" className="inputBox" onChange={(e)=>setAuthor(e.target.value)}></input>
              </span>
              <span>
              <button onClick={handleSearch}>搜索</button>
              </span>
            </div>
            <div className="bookList">
              <table >
                
                <thead>
                <tr>
                  <th scope="col" className="nameCol">名称</th>
                  <th scope="col" className="authorCol">作者</th>
                  <th scope="col" className="categoryCol">类别</th>
                  <th scope="col" className="is_lentCol">借阅状态</th>
                </tr>
                </thead>
               <tbody>
               {data.map((bookItem,index)=>(
                <tr key={index}>
                <td className="nameCol">{bookItem.name}</td>
                <td className="authorCol">{bookItem.author}</td>
                <td className="categoryCol">{bookItem.category}</td>
                <td className="is_lentCol">{bookItem.is_lent?"已借出":"未借出"}</td>
                </tr>
               ))}
               </tbody> 
                
               </table>
            </div>
            
          </div>
        </div>
    )
    

}
