import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './dashboardElements.css'
import PostsTable from './PostsTable';
// ----------------------------------------------------------------------

export default function DashElements() {


  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);



  //retrieve posts
 
  useEffect(() => {
    axios.get('http://localhost:8001/api/posts').then(res=>
    { 
          if(res.data.status===200){
             setPosts(res.data.posts)
          }
           
    })

    axios.get('http://localhost:8001/api/categories').then(res=>
     { 
               if(res.data.status===200)
               setCategories(res.data.categories)
               
     })
  }, []);








  return (
    <div className="container">


    <div className="row align-items-start py-3 px-0">
      <div className="col column1">
        <h3>{posts.length}</h3>  
        <p>Posts</p>  
      </div>

      <div className="col column2">
      <h3>{categories.length}</h3> 
        <p>Category</p>  
      </div>

      <div className="col column3">
        <h3>1</h3> 
        <p>Users</p>  
      </div>

      <div className="col column4">
        <h3>350</h3> 
        <p>Comments</p>  
      </div>
    </div>


    <PostsTable />


       
   
   


  </div>
  );
}
