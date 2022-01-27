import React,{useEffect, useState} from 'react';
import axios from 'axios';

const PostsTable = () => {


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState();
  const [limit, setLimit] = useState(6);


  useEffect(() => {
    axios.get('http://localhost:8001/api/posts').then(res=>
    { 
          if(res.data.status===200){
             setPosts(res.data.posts)
             setLoading(false)
          }
           
    })
  }, []);


//next Posts
const nextPosts = () => {
    setSkip(skip+6);

    
    axios.get(`http://localhost:8001/api/postslimit/${skip}/${limit}`).then(res=>
    { 
          if(res.data.status===200){
             setPosts(res.data.posts)
             setLoading(false)
          }
           
    })

}

//next Posts
const previousPosts = () => {

}





  if(loading){
    return (
      <div className="row" style={{ width:'100%'}}>
      <div className="col-9 mx-auto p-4 text-secondary text-center" >
          <h4>Loading...</h4>
        </div>
      </div>
    )
  }






  return (
    <>
    <table className="table table-dark table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Category</th>
        <th scope="col">Description</th>
        <th scope="col">Image</th>
        <th scope="col">Author</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>

          {
            posts && (
              posts.map((post,index)=>(
                    <tr key={index+1}>
                      <th scope="row">{index+1}</th>
                      <td>{post.title}</td>
                      <td>{post.category}</td>
                      <td>{post.description}</td>
                      <td>
                         <img  src={`http://localhost:8001/${post.postImage}`}  width='60px' height="50px"    />
                      </td>
                      <td>user</td>
                      <td>
                         <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-success mx-2">Edit </button>
                            <button type="button" class="btn btn-danger">Delete</button>

                          </div>
                      </td>
                    </tr>

              ))
                                    )
           }
     
      

    </tbody>
       
  </table>

  <nav className="d-flex justify-content-between">
                    <button onClick={previousPosts} className=" bg-dark page-link " style={{color:'#fff'}}  >
                        <span aria-hidden="true">&laquo;</span>
                    </button>

                    <button onClick={nextPosts} className=" bg-dark page-link "style={{color:'#fff'}} >
                        <span aria-hidden="true">&raquo;</span>
                    </button>

    </nav>
</>
  )
};

export default PostsTable;
