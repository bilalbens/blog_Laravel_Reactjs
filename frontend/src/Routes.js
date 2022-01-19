import React from 'react'
import {BrowserRouter ,Switch, Route} from 'react-router-dom'
import Menu from './menu/Menu'
import  Signin from "./user/Signin"
import Home from './Home'
import Signup from './user/Signup'
import axios from "axios"
import PrivateRoute from './auth/PrivateRoute'
import AdminDashboard from './dashboard/AdminDashboard'
import Post from './core/Post'
import Category from './core/Category'


axios.defaults.headers.post["Accept"] = 'application/json';
axios.defaults.headers.post["Content-Type"] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}`: '';
    return config
})

const Routes = () => {
    return (
        <BrowserRouter>
                <Menu></Menu>
                <Switch>
                <PrivateRoute path="/home" exact component={AdminDashboard} />
                <PrivateRoute path="/admin/post" exact component={Post} />
                <PrivateRoute path="/admin/category" exact component={Category} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />

                </Switch>

            </BrowserRouter>
    )
}

export default Routes
