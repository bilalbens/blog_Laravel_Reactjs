import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';

const ShowPost = (props) => {


    const [post, setPost] = useState({})
    const [related, setRelated] = useState([])

    useEffect(()=>{
        let postId = props.match.params.id
        axios.get(`http://localhost:8001/api/post/${postId}`).then(res=>
        { 
            if(res.data.status===200){
                setPost(res.data.post)
                 return  res.data.post;
            }
            
        }).then(res=>{
            axios.get(`http://localhost:8001/api/posts/${res.id}/${res.category}`).then(res=>
            { 
                console.log(res)
                if(res.data.status===200){
                    setRelated(res.data.posts)
                    console.log(res.data.posts)
                }
                
            })
        })



    },[props])








    
  return (

    <div className="row  px-auto mx-auto"> 
        <div className="col-8 mx-auto  my-4 " >
        <div key={post.id} className="card my-3 mx-5 p-5  shadow-sm  bg-body rounded" >
                            <img  src={`http://localhost:8001/${post.postImage}`}  width='160px' height="450px"  className="card-img-top"  />
                            

                            <div className="card-body">
                            <h3 className="my-2">{post.title}</h3>
                            <p className="card-text">{post.description}</p>

                            
                                <MDEditor.Markdown source={post.content} />

                            </div>

                            <div className="my-3">
                                 <p className="">Category: {post.category}   |  Added :   {moment(post.created_at).fromNow()}</p>
                                 <span className="">
                                     

                                 </span>

                            </div>
                        </div>
        </div>
        <div className="col-3 mx-5 my-5  p-0 text-secondary  shadow-sm  bg-body rounded" >
                    <h3 className="m-3">Related Posts</h3>
                    <div>
                        {
                            related && (
                                related.map(relatedPost=>(
                                    <div key={relatedPost.id} className="card my-3 mx-4 p-4  shadow-sm  bg-body rounded" >
                                    <img  src={`http://localhost:8001/${relatedPost.postImage}`}  width='100px' height="120px"  className="card-img-top"  />
                                    
        
                                    <div className="card-body">
                                    <h5 className="my-1">{relatedPost.title}</h5>
                                    <div className="d-flex justify-content-end ">
                                            <Link to={`/post/${relatedPost.id}`}>
                                                <button className="btn btn-primary mr-1">Read...</button>
                                            </Link>
                                    </div>
                                    </div>
                                </div>
                                ))
                            )
                        }
                    </div>
        </div>
    </div>
  )
};

export default ShowPost;
