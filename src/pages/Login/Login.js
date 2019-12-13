import React,
{ Component } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
import { Toast } from 'antd-mobile'
// import store from '../../store/index'
export default class Login extends Component {
    state = {
        user: {
            name: '',//账号
            pass: '',//密码
            type: "2"
        }
    }
    changeName(e) {//账号
        var user = this.state.user
        user.name = e.target.value
        this.setState({
            user: user
        })
    }
    changePass(e) {//密码
        var user = this.state.user
        user.pass = e.target.value
        this.setState({
            user: user
        })
    }
    //登录=============================================
    toIndex() {
        this.$axios({
            url: API.login,
            method: 'post',
            data: this.state.user
        }).then(res => {
            console.log(res);
            if (res.data.isok) {
                // store.dispatch({
                //     type: "login",
                //     payload: this.state.user
                // })
                // Toast.success(res.data.info)
                localStorage.setItem('username',this.state.user.name)
                localStorage.setItem('userpass', this.state.user.pass)
                this.props.history.push('/index')
            } else {
                Toast.fail(res.data.info)
            }
        })
    }
    render() {
        return (
            <div className='login-box'>
                <div className='login-title'>
                    <Back />
                    <span>登录</span>
                </div>
                {/* 输入框 */}
                <div className='login-ipt'>
                    <input type="text" placeholder="邮箱/手机号" value={this.state.user.name} onChange={(e) => this.changeName(e)} /><br />
                    <input type="password" placeholder="密码" value={this.state.user.pass} onChange={(e) => this.changePass(e)} />
                </div>
                {/* 登录按钮 */}
                <div className='login-btn'>
                    <button onTouchEndCapture={() => this.toIndex()}>登录</button>
                </div>
                <div className='login-bot'>
                    <Link to='' >忘记密码？</Link>
                </div>
                {/* 注册按钮 */}
                <div className='logon'>
                    <Link to='/logon' >注册</Link>
                </div>
                <div className='login-foot'>
                    <span>或者</span>
                    <p>社交账号登录</p>
                    <div><span className='iconfont icon-QQ'></span>
                        <span className='iconfont icon-weibo'></span>
                        <span className='iconfont icon-weixin'></span>
                    </div>

                </div>
            </div>
        )
    }
}