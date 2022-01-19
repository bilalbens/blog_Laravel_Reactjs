import React from 'react';
import AdminDashboard from '../dashboard/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';








const Post = () => {
  return <div className="row" style={{ width:'100%'}}>
                    <div className="col-3" >
                         <AdminDashboard/>
                    </div>
                    <div className="col-9" >New Post</div>
        </div>;
};

export default Post;
