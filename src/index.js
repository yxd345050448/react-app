import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/js/rem';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css';
import 'antd/dist/antd.css';
import './assets/css/iconfont.css'
import axios from 'axios'
//将axios挂在原型链上
Component.prototype.$axios = axios
//响应拦截
axios.interceptors.response.use(response => {
    console.log("------------响应拦截" + response.config.url + "--------------");
    console.log(response);
    console.log("-------over--------");
    if (response.data.code === -1) {//如果掉线，跳转到登录页面
        window.open('http://localhost:3000/login', "_self")
        return {
            data: {
                data: []
            }
        }
    }
    return response
})
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
