import React,{useEffect, useState} from 'react';
import axios from 'axios';
import toastr from 'toastr'
import { Link } from 'react-router-dom';
import "toastr/build/toastr.css"


const PostsTable = (props) => {


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [size, setSize] = useState(0);


  useEffect(() => {
    axios.get(`http://localhost:8001/api/postslimit/${skip}/${limit}`).then(res=>
    { 
          if(res.data.status===200){
             setPosts(res.data.posts)
             setSize(res.data.posts.length)
             setLoading(false)
          }
           
    })
  }, [props]);





//next Posts
const nextPosts = () => {

    const toskip = skip + limit

    
    axios.get(`http://localhost:8001/api/postslimit/${toskip}/${limit}`).then(res=>
    { 
          if(res.data.status===200){
             setPosts(res.data.posts)
             setSkip(toskip);
             setSize(res.data.posts.length)
             setLoading(false)
          }
           
    })

}



const buttonNextPosts = ()=>{
  return(
      (   
          size > 0 &&
          size >= limit &&
          (<button onClick={nextPosts} className=" bg-dark page-link "style={{color:'#fff'}} >
              <span aria-hidden="true">&raquo;</span>
          </button>)
      )
  )
}


//previous Posts
const previousPosts = () => {
      const toskip = skip - limit

        
      axios.get(`http://localhost:8001/api/postslimit/${toskip}/${limit}`).then(res=>
      { 
            if(res.data.status===200){
              setPosts(res.data.posts)
              setSkip(toskip);
              setSize(res.data.posts.length)
              setLoading(false)
            }
            
      })


}


const buttonPreviousPosts = ()=>{
  return(
      (   
          size <= limit &&
          ( <button onClick={previousPosts} className=" bg-dark page-link "style={{color:'#fff'}} >
              <span aria-hidden="true">&laquo;</span>
            </button>
          )
      )
  )
}




//delete post
const deletePost = (e,id)=>{
  // e.preventDefault();

  // const thisClicked = e.currentTarget
  // thisClicked.innerText ="deleting"

  axios.delete(`http://localhost:8001/api/post/${id}}`).then(res=>
  { 
        if(res.data.status===204){
              toastr.warning("Post Deleted successfully","Deleted",{
                "positionClass": "toast-bottom-left",
            })
            // thisClicked.closest("tr").remove();
        }
        
  }).then(res=>{
    axios.get(`http://localhost:8001/api/postslimit/${skip}/${limit}`).then(res=>
    { 
          if(res.data.status===200){
             setPosts(res.data.posts)
             setSize(res.data.posts.length)
             setLoading(false)
          }
           
    })
  })
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
                      <td>
                        <Link style={{color:"#fff", textDecoration:"none"}} to={`/post/${post.id}`}>
                                {post.title}
                        </Link>
                      </td> 
                      <td>{post.category}</td>
                      <td>{post.description}</td>
                      <td>
                         <img  style={{objectFit:"cover"}} src={`http://localhost:8001/${post.postImage}`}  width='60px' height="50px"    />
                      </td>
                      <td>user</td>
                      <td>
                         <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-success mx-2">Edit </button>
                            <button onClick={(e)=>{deletePost(e,post.id)}} type="button" class="btn btn-danger">Delete</button>

                          </div>
                      </td>
                    </tr>

              ))
                                    )
           }
     
      

    </tbody>
       
  </table>

  <nav className="d-flex justify-content-between">
                    {buttonPreviousPosts()}
                    {buttonNextPosts()}
                    

    </nav>
</>
  )
};

export default PostsTable;
