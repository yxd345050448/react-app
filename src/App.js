import React,
{ Component } from 'react'
import './App.css'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login/Login'//登录页
import Logon from './pages/Logon/Logon'//注册页
import SetUser from './pages/Set-user/Set-user'//用户页面
import Index from './pages/Index/Index'//首页
import Teacher from './pages/Teacher/Teacher'//家教页
import Home from './pages/Home/Home'//家政页
import HomeList from './pages/Home-list/Home-list'//家政列表
import HomeDetail from './pages/Home-detail/Home-detail'//家政详情
import Repair from './pages/Repair/Repair'//维修页
import RepairDetail from './pages/Repair-detail/Repair-detail'//维修详情
import Water from './pages/Water/Water'//水站页
import WaterDetail from './pages/Water-detail/Water-detail'//水站详情
import img from './assets/img/wx.jpg'
export default class App extends Component {
  state = {
    

  }
  render() {
    return (
      // 一级路由出口
      <div className='App'>
        <Switch>
          {/* 登录 */}
          <Route path='/login' component={Login}></Route>
          {/* 注册 */}
          <Route path='/logon' component={Logon}></Route>
          {/* 首页 */}
          <Route path='/index' component={Index}></Route>
          {/* 用户修改 */}
          <Route path='/set-user' component={SetUser}></Route>
          {/* 家教 */}
          <Route path='/teacher' component={Teacher}></Route>
          {/* 家政 */}
          <Route path='/home' component={Home}></Route>
          {/* 家政详情 */}
          <Route path='/home-detail/:id' component={HomeDetail}></Route>
          {/* 家政列表 */}
          <Route path='/home-list/:id' component={HomeList}></Route>
          {/* 水站 */}
          <Route path='/water' component={Water}></Route>
          {/* 水站详情 */}
          <Route path='/water-detail/:id' component={WaterDetail}></Route>
          {/* 维修 */}
          <Route path='/repair' component={Repair}></Route>
          {/* 维修详情 */}
          <Route path='/repair-detail/:id' component={RepairDetail}></Route>
          {/* 重定向 */}
          <Redirect to='/login' />
        </Switch>
        {/* 侧边栏 */}
        
      </div>
    )
  }
}