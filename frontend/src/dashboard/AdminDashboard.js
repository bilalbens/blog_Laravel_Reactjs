import * as React from 'react';
import List from '@mui/material/List';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import VideoStableIcon from '@mui/icons-material/VideoStable';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import Container from '@mui/material/Container';
import ListIcon from '@mui/icons-material/List';
import { Link, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../dashboard/sidebars.css'


const isActive = (history, path)=>{
    if(history.location.pathname === path){
        return " nav-link active"
    }
    else{
      return "nav-link text-white"
    }

}






const AdminDashboard = (props) => {
    return (

      <div>



            <main>

            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width:280}}>
            <Link   className={isActive(props.history,"/home" )} to="/home">
               <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Blog Dashboard</span>
              </a>
        </Link>
    
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">

       <li>
          <Link aria-current="page" className={isActive(props.history,"/homepage" )}   to="/homepage">
            <AddIcon/>        Home
          </Link>
      </li>


      <li>
        <Link   aria-current="page" className={isActive(props.history,"/admin/post" )} to="/admin/post">
        <ListIcon/>        Post
        </Link>
        
      </li>
      <li>
          <Link aria-current="page" className={isActive(props.history,"/admin/category" )} to="/admin/category">
            <AddIcon/>        Categorie
          </Link>
      </li>

      
      
    </ul>
    <hr/>

    

  </div>
  <div className="b-example-divider"></div>
  </main> 
</div>
      
    )
}

export default withRouter(AdminDashboard)


