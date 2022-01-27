import React, { useState, useEffect } from 'react';

import AdminDashboard from '../../dashboard/AdminDashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Category = (props) => {


     const [category, setCategory] = useState({
          name:"",
          description:"",
          error_list:[]
     });
     const [categories, setCategories] = useState([]);


     //handle change
     function handleChange(e){
          setCategory({...category, [e.target.id]:e.target.value})
          
     }


     //retrieve categories
     useEffect(() => {
     axios.get('http://localhost:8001/api/categories').then(res=>
     { 
               if(res.data.status===200)
               setCategories(res.data.categories)
               
     })
     
     }, [props]);
    

     
     //submit
     function submitCategory(e){
          e.preventDefault();

          const data = {
               name:category.name,
               description:category.description,
          };

          axios.post('http://localhost:8001/api/addcategory',data).then(res=>
               {
                    if(res.data.status === 200){
                       console.log("Category added successfully");
                       document.getElementById('category_form').reset();
                    //    setCategory({})
                    }else{
                         setCategory({...category, error_list:res.data.errors})
                    }
               })
     }







  return <div className="row" style={{ width:'100%'}}>
                    <div className="col-3" >
                         <AdminDashboard/>
                    </div>
                    <div className="col-6 my-4 p-3 text-secondary " >
                         <h3 className="mb-4">Add Category</h3>
                              <div className="container-fluid py-4  shadow p-3 mb-5 bg-body rounded">

                                   <form onSubmit={submitCategory} id="category_form">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                             <li className="nav-item" role="presentation">
                                             <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Category</button>
                                             </li>      
                                             
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                             <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                                       <div className="form-group my-3">
                                                            <label>Name</label> 
                                                            <input type="text" name="name" className="form-control mb-1" id='name' onChange={handleChange} />
                                                            <span className="text-danger">{category.error_list.name}</span>
                                                       </div>

                                                       <div className="form-group my-3">
                                                            <label>Description</label> 
                                                            <input type="text" name="Description" className="form-control" id='description' onChange={handleChange} />

                                                       </div>

                                                       {/* <div className="form-group my-3">
                                                            <label>Image</label> 
                                                            <input type="file" name="image" className="form-control" onChange={handleChange} />
                                                       </div> */}

                                             </div>
                                        
                                        </div>    

                                        <button type="suvmit" class="btn btn-primary">Submit</button>
                                   </form>
                              </div>



                         <h3 className="mb-4">Categories </h3>
                              <div className="container-fluid py-2  shadow p-3 mb-5 bg-body rounded">                                            
                                   <table class="table">
                                        <thead>
                                        <tr>
                                             <th scope="col">#</th>
                                             <th scope="col">Category</th>
                                             <th scope="col">Posts</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                             categories && (
                                             categories.map((categ,index)=>
                                                            (
                                                            <tr key={index+1}>
                                                                 <th scope="row">{index+1}</th>
                                                                 <td>{categ.name}</td>
                                                                 <td>5</td>
                                                            </tr>

                                                            )
                                                       )
                                             )
                                             }

                                        </tbody>
                                   </table>
                              </div>
                    </div>
        </div>;
};

export default Category;
