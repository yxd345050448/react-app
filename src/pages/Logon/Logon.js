import React,
{ Component } from 'react'
// import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import './Logon.css'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
import { Toast } from 'antd-mobile'
export default class Logon extends Component {
    state = {
        user: {
            tel: '',//电话
            name: '',//账号
            pass: ''//密码
        }
    }
    changeTel(e) {
        var user = this.state.user
        user.tel = e.target.value
        this.setState({
            user
        })
    }
    changePass(e) {
        var user = this.state.user
        user.pass = e.target.value
        this.setState({
            user
        })
    }
    changeName(e) {
        var user = this.state.user
        user.name = e.target.value
        this.setState({
            user
        })
    }
    //注册用户========================================================
    addUser() {
        this.$axios({
            url: API.addUser,
            method: 'post',
            data: this.state.user
        }).then(res => {
            // console.log(res);
            if (res.data.isok) {
                Toast.success(res.data.info)
                this.props.history.push('/login')
            } else {
                Toast.fail(res.data.info)
            }
        })
    }
    render() {
        return (
            <div className='logon-box'>
                <div className='logon-title'>
                    <Back />
                    <span>注册</span>
                </div>
                <div className='logon-ipt'>
                    <div className='user-name'>

                        <input type="text" placeholder="账号" value={this.state.user.name} onChange={(e) => this.changeName(e)} />
                    </div>
                    <div className='tel-mail'>
                        <span className='iconfont icon-shouji'></span>
                        <input type="text" placeholder="邮箱/手机号" value={this.state.user.tel} onChange={(e) => this.changeTel(e)} />
                    </div>
                    <div className='tel-yz'>
                        <span className='iconfont icon-iconfontmima1'></span>
                        <input type="text" placeholder="手机验证码" />
                        <span className='tel-yzm'>验证码</span>
                    </div>
                    <div className='logon-pass'>
                        <span className='iconfont icon-mima'></span>
                        <input type="text" placeholder="6~32位密码" value={this.state.user.pass} onChange={(e) => this.changePass(e)} />
                    </div>
                </div>
                <div className='logon-btn'>
                    <button onTouchEndCapture={() => this.addUser()}>注册</button>
                </div>
            </div>
        )
    }
}