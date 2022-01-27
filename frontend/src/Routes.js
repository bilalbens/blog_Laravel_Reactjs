import React from 'react'
import {BrowserRouter ,Switch, Route} from 'react-router-dom'
import Menu from './menu/Menu'
import  Signin from "./user/Signin"
import Signup from './user/Signup'
import axios from "axios"
import PrivateRoute from './auth/PrivateRoute'
import AdminDashboard from './dashboard/AdminDashboard'
import Post from './core/post/Post'
import Category from './core/category/Category'
import Home from './dashboard/Home'
import HomePage from './HomePage/HomePage'
import ShowPost from './HomePage/ShowPost'


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
                <PrivateRoute path="/home" exact component={Home} />
                <PrivateRoute path="/admin/post" exact component={Post} />
                <PrivateRoute path="/admin/category" exact component={Category} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/homepage" exact component={HomePage} />
                <Route path="/post/:id" exact component={ShowPost} />


                </Switch>

            </BrowserRouter>
    )
}

export default Routes
