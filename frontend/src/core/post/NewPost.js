import React, { useState,useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { height } from '@mui/system';
import MarkdownEditor from './MarkdownEditor';
import { TextField, Grid,FormControl,InputLabel,OutlinedInput,InputAdornment, formatMs,MenuItem,Select } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import Uploader from './Uploader';
import axios from 'axios';
import { useHistory } from 'react-router';
// import FormData from 'formdata';







const NewPost = (props) => {


const history = useHistory();

//post state
const [post, setPost] = useState({
    postImage:'',
    title:'',
    category:'',
    description:'',
    error_list:[]
})
const [formData, setFormData] = useState(new FormData()); 

//content
const [content, setContent] = useState("**Your Content!!!**");

//image state
const [image, setImage] = useState([]);

//categories
const [categories, setCategories] = useState([]);


//handle input
const handleChange =(e)=>{
  
      setPost({...post,[e.target.name]:e.target.value})

  }


  //handle image
  
const handleImage =(e)=>{  
     setImage({image:e.target.files[0]})

}



//retrieve categories
useEffect(() => {
  axios.get('http://localhost:8001/api/categories').then(res=>
  { 
        if(res.data.status===200)
          setCategories(res.data.categories)
         
  })

}, []);
  


//submit post

  const submitPost=(e)=>{
        e.preventDefault()
        // console.log(formData)
        // console.log(post)
        formData.append('title', post.title)
        formData.append('category', post.category)
        formData.append('description', post.description)
        formData.append('content', content)
        formData.append('postImage', image.image)

        
    //  console.log(formData)

     axios.post('http://localhost:8001/api/addpost',formData).then(res=>
          {
               if(res.data.status === 200){
                  console.log("post added successfully");
                  document.getElementById("post_form").reset();
                  setContent("**Your Content!!!**")


               }else{
                 console.log(res.data.errors)
                setPost({...post, error_list:res.data.errors})

               }
          })

  
  };



  return (
    
    <Container sx={{height: '100%', width: '100%',pt:3, m: 0 }}>
              <h3 className="text-secondary" >Create a new post</h3>

              <Box sx={{ width: '100%', borderRadius: 8,bgcolor: '#FFFFFF' ,height: '93%',boxShadow: 3,   }} >
              <form onSubmit={submitPost} id="post_form">

              <div className="row pt-4" style={{ width:'100%'}}>
                  <div className="col-9" >
                  
                        <Grid container justifyContent="center" spacing={2} sx={{p:5}}>
                              <Grid item xs={10}  >
                                  <TextField
                                  className="mt-4"
                                    sx={{p:5}}
                                    fullWidth
                                    label="Post Title"
                                    id="filled-textarea standard-size-normal" 
                                    variant="filled"
                                    margin="dense" 
                                    name="title" 
                                    id="title" 
                                    onChange={handleChange}
                        
                                  />
                                <span className="text-danger">{post.error_list.title}</span>

                              </Grid>

                              <Grid item xs={10}>
                                <TextField
                                  fullWidth
                                  id="filled-textarea standard-size-normal"
                                    variant="filled"
                                  label="Description"
                                  name="description" 
                                  id="description" 
                                  multiline
                                  rows={3}
                                  onChange={handleChange}
                                />
                              </Grid>

                              <Grid item xs={11}>
                                <h6 className="mx-5 text-secondary mt-2">Content</h6>
                                <MarkdownEditor
                                  content ={content}
                                  setContent={setContent}
                                />
                                
                              </Grid>

                              <Grid item xs={10}>
                                <h6 className="mx-2 text-secondary mt-2">Upload Cover</h6>
                                <input onChange={handleImage} id="postImage" type="file" className="form-control-file mx-2" name="postImage"  />
                                <span className="d-block text-danger">{post.error_list.postImage}</span>


                              </Grid>


                          </Grid>


                      
                  </div>
                  <div className="col-3" >

                            <Grid item xs={10}  >
                            <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label ">Category</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="category"
                                    label="Category"
                                    name="category" 
                                    // defaultValue=
                                    onChange={handleChange}

                                  >
                                    {
                                      categories && (categories.map(category=>(
                                        <MenuItem index={category.id}    value={category.name}>{category.name}</MenuItem>
                                      )
                                      ))
                                    }

                                  </Select>
                                </FormControl>
                                <span className="d-block text-danger">{post.error_list.category}</span>

                        </Grid>
                        <button  className="my-4 btn btn-outline-primary">New Product</button>
                             
                  </div>
              </div>
              </form>

              </Box>


    </Container>






     

        
        
  );
};



export default NewPost
