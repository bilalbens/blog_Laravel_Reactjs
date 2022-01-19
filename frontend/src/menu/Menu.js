import React, { useState } from 'react';
import {Link , withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { isAuthenticated } from '../Helpers/isAuthenticated';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Menu = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };



  const signout = ()=>{

    axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
    // Login...

          axios.post("http://localhost:8000/api/logout").then(res=>{


            if(res.data.status === 200){
                localStorage.removeItem("auth_token")
                localStorage.removeItem("auth_name")
                props.history.push('/signin')

            }
           else{
            
          }
            
          });

    });

  }



  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className={classes.title}>
          BLOGLogo
        </Typography>


        {
          !isAuthenticated() && (
            <>
            <Link style={{ textDecoration: 'none' }} to='/signup'>
                <Button style={{color:"#fff"}} >
                    Register
                </Button>
        </Link>
        <Link style={{ textDecoration: 'none' }}   to='/signin'>
                <Button style={{color:"#fff"}} >
                    Singin
                </Button>
        </Link>

        </>
          )
        }


        {
          isAuthenticated() && (
            <>
            <Link style={{ textDecoration: 'none' }} to='/signin'>
                <Button style={{color:"#fff"}} onClick={signout} >
                    Log out
                </Button>
        </Link>


        </>
          )
        }
        
      </Toolbar>

    </AppBar>
  );
};

export default withRouter(Menu);