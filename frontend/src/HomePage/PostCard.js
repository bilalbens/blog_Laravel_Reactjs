import React from 'react';
import moment from 'moment'
import MDEditor from '@uiw/react-md-editor';
import { Link } from 'react-router-dom';


const PostCard = ({post}) => {
  return (
                <div className="row" style={{ width:'100%'}}>
                    <div className="col-10 mx-auto  p-4 text-secondary" >

                        <div key={post.id} className="card my-3 mx-5 p-5  shadow-sm  bg-body rounded" >
                            <img style={{objectFit:"cover"}}  src={`http://localhost:8001/${post.postImage}`}  width='160px' height="450px"  className="card-img-top"  />
                            

                            <div className="card-body">
                            <h3 className="my-2">{post.title}</h3>
                            <p className="card-text">{post.description}</p>
                            <p className="card-text btn btn-success cursor">{post.category}</p>
                            {/* <p className="card-text">{post.content}</p> */}
                            {/* <MDEditor.Markdown source={post.content} /> */}

                            <span className="d-block">
                                     {moment(post.created_at).fromNow()}       

                            </span>
                            <div className="d-flex justify-content-end ">
                                    <Link to={`/post/${post.id}`}>
                                        <button className="btn btn-primary mr-1">Read...</button>
                                    </Link>
                                {/* <a href="#" className=" btn btn-primary ">Read..</a> */}
                            </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
  )
};

export default PostCard;
