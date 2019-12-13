import React,
{ Component } from 'react'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
import img from '../../assets/img/wx.jpg'
import { Toast, Button, Modal } from 'antd-mobile'
import "./Set-user.css"
export default class Parent extends Component {
    state = {
        userImg: {},//用户头像电话
        user: {//用户账号密码
            name: localStorage.getItem('username'),
            oldpass: '',
            newpass: ''
        }
    }
    changeName(e) {
        var user = this.state.user
        user.name = e.target.value
        this.setState({
            user
        })
    }
    changeOldpass(e) {
        var user = this.state.user
        user.oldpass = e.target.value
        this.setState({
            user
        })
    }
    changeNewpass(e) {
        var user = this.state.user
        user.newpass = e.target.value
        this.setState({
            user
        })
    }
    //修改密码
    setPass() {
        this.$axios({
            url: API.changePassUser,
            method: 'post',
            data: this.state.user
        }).then(res => {
            if (res.data.isok) {
                Toast.success(res.data.info)
                this.props.history.push('/login')
            } else {
                Toast.fail(res.data.info)
            }
        })
    }
    //更新用户头像
    updateImg(url) {
        this.$axios({
            url: API.updateUser,
            method: 'post',
            data: {
                name: localStorage.getItem('username'),
                img: url
            }
        }).then(res => {
            this.setState({})
        })
    }
    //更新用户电话
    updateTel(tel) {
        this.$axios({
            url: API.updateUser,
            method: 'post',
            data: {
                name: localStorage.getItem('username'),
                tel: tel
            }
        }).then(res => {
            this.setState({})
        })
    }
    //查询用户
    findUser() {
        this.$axios({
            url: API.findUser,
            method: 'post',
            data: {
                name: localStorage.getItem('username'),
            }
        }).then(res => {
            // console.log(res);
            this.state.userImg = res.data.data[0]
            this.setState({})
        })
    }
    componentDidMount() {
        this.findUser()
    }
    render() {
        var userImg = this.state.userImg
        const prompt = Modal.prompt;
        return (
            <div className='user-box'>
                {/* 顶部 */}
                <div className='user-title'>
                    <Back />
                    <span>用户中心</span>
                    <span className='iconfont icon-wode'></span>
                </div>
                {/* 修改头像 */}
                <div className='user-img'>
                    <div><img src={userImg.img} /></div>
                    <div><button onTouchEndCapture={() => prompt(
                        '修改头像',
                        '请输入图片网址',
                        [
                            { text: '取消' },
                            { text: '提交', onPress: url => this.updateImg(url) },
                        ],
                        'text',
                    )}>修改头像</button></div>
                    <div><button onTouchEndCapture={() => prompt(
                        '修改电话',
                        '请输入电话号码',
                        [
                            { text: '取消' },
                            { text: '提交', onPress: tel => this.updateTel(tel) },
                        ],
                        'text',
                    )}>修改电话</button></div>
                </div>
                {/* 修改密码 */}
                <div className='user-setpass'>
                    <div className='user-name'>
                        <input type="text" placeholder={localStorage.getItem('username')} value={this.state.user.name} onChange={(e) => this.changeName(e)} disabled />
                    </div>
                    <div className='user-oldpass'>
                        <input type="text" placeholder="原始密码" value={this.state.user.oldpass} onChange={(e) => this.changeOldpass(e)} />
                    </div>
                    <div className='logon-newpass'>
                        <input type="text" placeholder="新密码" value={this.state.user.newpass} onChange={(e) => this.changeNewpass(e)} />
                    </div>
                    <div>
                        <button onTouchEndCapture={() => this.setPass()}>修改密码</button>
                    </div>
                </div>
            </div>
        )
    }
}