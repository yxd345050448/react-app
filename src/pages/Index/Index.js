import React,
{ Component } from 'react'
import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import API from '../../util/Api'
import { Toast, Carousel, WingBlank } from 'antd-mobile'
import './Index.css'
import axios from 'axios'
import img from '../../assets/img/wx.jpg'
export default class Index extends Component {
    state = {
        imgHeight: 176,
        banner: [],//存轮播图
        left: '-100vw',
        user: []//存用户信息
    }
    //跳转===========================================
    toTeacher() {
        this.props.history.push('/teacher')
    }
    toWater() {
        this.props.history.push('/water')
    }
    toRepair() {
        this.props.history.push('/repair')
    }
    toHome() {
        this.props.history.push('/home')
    }
    toSetuser() {
        this.props.history.push('/set-user')
    }
    //侧边栏=========================================
    startX = 0;//全局变量开始
    endX = 0;//全局变量结束
    touchStart(e) {//滑动开始
        this.startX = e.touches[0].clientX;
        this.endX = 0;
        // console.log('start');
    }
    touchMove(e) {//滑动中
        this.endX = e.touches[0].clientX;
        // console.log('move');
    }
    touchEnd(e) {//滑动结束
        // console.log('end');
        if (this.endX > this.startX + 30 && this.endX != 0) {//右滑显示
            this.state.left = '0'
            this.setState({})
        }
        if (this.endX + 30 < this.startX && this.endX !== 0) {//左滑消失
            this.state.left = '-100vw'
            this.setState({})
        }
    }
    //查询用户
    findUser() {
        this.$axios({
            url: API.findUser,
            method: "post",
            data: {
                name: localStorage.getItem('username')
            }
        }).then(res => {
            // console.log(res);
            this.state.user = res.data.data[0]
            this.setState({})
        })
    }
    //页面加载执行
    componentDidMount() {
        //请求轮播图
        axios({
            url: API.banner,
            method: 'get'
        }).then(res => {
            console.log(res);
            this.state.banner = res.data.data
            // 开定时器
            setTimeout(() => {
                this.setState({});
            }, 100);
        })
        this.findUser()
    }
    render() {
        var userItem = this.state.user
        return (
            <div className='index-box'
                onTouchStartCapture={(e) => this.touchStart(e)}
                onTouchMoveCapture={(e) => this.touchMove(e)}
                onTouchEndCapture={(e) => this.touchEnd(e)}
            >
                {/* 顶部 */}
                <div className='index-title'>
                    <span className='iconfont icon-gengduo'></span>
                    <span>龙山家园</span>
                    <span className='iconfont icon-wode'></span>
                </div>
                {/* 搜索框 */}
                <div className='index-search'>
                    <span className='iconfont icon-RectangleCopy2'></span>
                    <input type="text" placeholder='Search' />
                    <a href="#">我要搜索</a>
                </div>
                {/* 轮播图 */}
                <div className='index-lbt'>
                    <WingBlank>
                        <Carousel
                            autoplay={true}
                            infinite
                        >
                            {this.state.banner.map(item => (

                                <img key={item.id}
                                    src={item.img}
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                />

                            ))}
                        </Carousel>
                    </WingBlank>
                </div>
                {/* 天气 */}
                <div className='index-center'>
                    <span className='iconfont icon-tianqi'></span>
                    <div className='center-left'>
                        <p>多云/小雨<span>27/30°C</span></p>
                        <p>3-4级/4-5级</p>
                    </div>
                    <div className='center-right'>
                        <p>星期一</p>
                        <p>18:00</p>
                    </div>
                </div>
                {/* 路由图标 */}
                <div className='index-router'>
                    <div className='router-logo' onTouchEndCapture={() => this.toTeacher()}>
                        <div >
                            <span className='iconfont icon-tianchongxing-'></span>
                        </div>
                        <p>找家教</p>
                    </div>
                    <div className='router-logo' onTouchEndCapture={() => this.toWater()}>
                        <div>
                            <span className='iconfont icon-water_icon'></span>
                        </div>
                        <p>送水到家</p>
                    </div>
                    <div className='router-logo' onTouchEndCapture={() => this.toRepair()}>
                        <div>
                            <span className='iconfont icon-gongju'></span>
                        </div>
                        <p>维修服务</p>
                    </div>
                    <div className='router-logo' onTouchEndCapture={() => this.toHome()}>
                        <div>
                            <span className='iconfont icon-saoba'></span>
                        </div>
                        <p>家政</p>
                    </div>
                    <div className='router-logo'>
                        <div>
                            <span className='iconfont icon-shequ'></span>
                        </div>
                        <p>社区互动</p>
                    </div>
                    <div className='router-logo'>
                        <div>
                            <span className='iconfont icon-gengduo'></span>
                        </div>
                        <p>更多服务</p>
                    </div>
                </div>
                {/* 侧边栏 */}
                <div className='menu-box'>
                    <div className='msk' style={{ left: this.state.left }}>
                        <div className="menu">
                            <div className='menu-user' onTouchEndCapture={() => this.toSetuser()}>
                                <img src={userItem.img} />
                                <span>{userItem.name}</span>
                            </div>
                            <ul className='menu-list'>
                                <li><span className='iconfont icon-shumiao'></span>
                                    <Link to='/teacher'>找家教</Link></li>
                                <li>
                                    <span className='iconfont icon-shumiao'></span><Link to='/water'>送水到家</Link></li>
                                <li>
                                    <span className='iconfont icon-shumiao'></span><Link to='/repair'>维修服务</Link></li>
                                <li>
                                    <span className='iconfont icon-shumiao'></span><Link to='/home'>家政服务</Link></li>
                                <li>
                                    <span className='iconfont icon-shumiao'></span><Link to=''>社区互动</Link></li>
                                <li>
                                    <span className='iconfont icon-shumiao'></span><Link to=''>消息中心</Link></li>
                                <li>
                                    <span className='iconfont icon-shumiao'></span><Link to=''>我的收藏</Link></li>
                                <li>
                                    <span className='iconfont icon-shumiao'></span><Link to=''>我的发布</Link></li>
                                <li>
                                    <span className='iconfont icon-shumiao' ></span><Link to='/set-user'>账号设置</Link></li>
                                <li>
                                    <span className='iconfont icon-shumiao'></span><Link to=''>退出登录</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}