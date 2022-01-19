import React, {useState, useEffect,useRef} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { API_URL } from '../config';
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
// import "../user/sign.css"


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link style={{color:"#888"}} to="/about">
      Blog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup(props) {


    const history = useHistory()
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        error_list:[]
  
})



  const handleChange = (e) =>{
    setUser({...user, [e.target.id]:e.target.value})

  }
    
   const handleSubmit = (e) => {
    e.preventDefault();

    axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
          axios.post("http://localhost:8000/api/register", user).then(res=>{
              if(res.data.status === 200){
                  localStorage.setItem('auth_token', res.data.token)
                  localStorage.setItem('auth_name', res.data.username)
                  history.push('/signin')
              }else{
                setUser({...user, error_list:res.data.validation_error})
              }
          })


    });


   }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: '#F3A520' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          
          
          <Box 
            component="form" 
            noValidate 
            onSubmit={handleSubmit} 
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <span>{user.error_list.name}</span>
             


              <Grid   item xs={12}>
                <TextField
                  sx={{ borderColor: '#d01257 !important' }} 
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <span>{user.error_list.email}</span>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <span>{user.error_list.password}</span>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#026EA4' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link style={{color:"#888"}} to='/signin' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}