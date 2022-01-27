import React,{useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'react-moment';
import MDEditor from '@uiw/react-md-editor';
import PostCard from './PostCard';
import SliderSlick from "./SliderSlick"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'



const HomePage = () => {



  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  //retrieve categories
  
  useEffect(() => {
    axios.get('http://localhost:8001/api/categories').then(res=>
    { 
          if(res.data.status===200)
            setCategories(res.data.categories)
          
    })

  }, []);
  



  //retrieve posts

  useEffect(() => {
    axios.get('http://localhost:8001/api/posts').then(res=>
    { 
          if(res.data.status===200){
             setPosts(res.data.posts)
             setLoading(false)
          }
           
    })
  }, []);



  if(loading){
    return (
      <div className="row" style={{ width:'100%'}}>
      <div className="col-8 mx-auto p-4 text-secondary" >
          <h4>Loading...</h4>
        </div>
      </div>
    )
  }








  //return
  return (

    <>
          <div className="row bg-secondary px-auto mx-auto" style={{ width:'100%', height:"480px"}}> 
                <div className="col-8 mx-auto  my-4  text-center text-secondary" >
                     {/* <SliderSlick posts={posts}></SliderSlick> */}
                </div>
          </div>
          <div className="row" style={{ width:'100%'}}>

                    <div className="col-3 mx-auto  p-4 text-secondary shadow my-3 rounded-3 " >
                      
                              <h2>Filter</h2>
                              <div className="btn-group d-flex flex-column mx-5 my-3" role="group" aria-label="Basic checkbox toggle button group">
                                        <h4>By Category:</h4>
                                    {
                                      posts && (
                                        categories.map(category=>(
                                          <div className="mx-5">
                                            <input type="checkbox" className="btn-check my-4" id={category.id} />
                                            <label className="btn btn-outline-primary my-2" for={category.id}>{category.name}</label>
                                          </div>

                                        ))
                                      )
                                    }
                                

                              </div>
                              <div className="btn-group d-flex flex-column mx-5 my-3" role="group" aria-label="Basic checkbox toggle button group">
                                        <h4>By Time:</h4>
                                        <div className="mx-5 form-check">
                                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                          <label className="form-check-label" for="flexRadioDefault1">
                                                Newest
                                          </label>
                                        </div>
                                        <div className="mx-5 form-check">
                                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                          <label className="form-check-label" for="flexRadioDefault2">
                                              Oldest
                                          </label>
                                        </div>
                                

                              </div>

                    </div>

                      <div className="col-8 mx-auto p-5 text-secondary shadow my-3 rounded-3" >
                        <h2>Posts</h2>
                          {
                            posts && (
                              posts.map(post=>(
                                      <PostCard post={post}/>
                              ))
                            )
                          }
                      </div>
          </div>
    </>
  )
};

export default HomePage;
