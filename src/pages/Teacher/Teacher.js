import React,
{ Component } from 'react'
// import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import { Carousel, WingBlank } from 'antd-mobile'
import Back from '../../views/Back/Back'
import './Teacher.css'
import API from '../../util/Api'
export default class Parent extends Component {
    state = {
        imgHeight: 176,
        banner: [],//存轮播图
        top: []//家教排行
    }
    getTop() {
        this.$axios({
            url: API.teacherTop
        }).then(res => {
            console.log(res);
            this.state.top = res.data.data
            this.setState({})
        })
    }
    //页面加载执行
    componentDidMount() {
        //家教排行
        this.getTop()
        //请求轮播图
        this.$axios({
            url: API.teacherBanner,
            method: 'get'
        }).then(res => {
            console.log(res);
            this.state.banner = res.data.data
            // 开定时器
            setTimeout(() => {
                this.setState({});
            }, 100);
        })
    }
    render() {
        return (
            <div className='teacher-box'>
                {/* 顶部 */}
                <div className='teacher-title'>
                    <Back />
                    <span>找家教</span>
                    <span className='iconfont icon-wode'></span>
                </div>
                {/* 搜索框 */}
                <div className='teacher-search'>
                    <span className='iconfont icon-RectangleCopy2'></span>
                    <input type="text" placeholder='Search' />
                    <a href="#">我要搜索</a>
                </div>
                {/* 轮播图 */}
                <div className='teacher-lbt'>
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
                {/* 周边老师，问答 */}
                <div className='teacher-center'>
                    <div className='center-left'>
                        <span className='iconfont icon-dingwei'></span>
                        <p>周边老师</p>
                        <p>发现身边好老师</p>
                    </div>
                    <div className='center-right'>
                        <span className='iconfont icon-wenti-m'></span>
                        <p>我要提问</p>
                        <p>难题名师帮你解</p>
                    </div>
                </div>
                {/* 图标 */}
                <div className='teacher-logo'>
                    <div className='teacher-minbox'>
                        <div >
                            <span className='iconfont icon-thin-_book_writi'></span>
                        </div>
                        <p>小学</p>
                    </div>
                    <div className='teacher-minbox'>
                        <div >
                            <span className='iconfont icon-thin-_book_writi'></span>
                        </div>
                        <p>初中</p>
                    </div>
                    <div className='teacher-minbox'>
                        <div >
                            <span className='iconfont icon-thin-_book_writi'></span>
                        </div>
                        <p>高中</p>
                    </div>
                    <div className='teacher-minbox'>
                        <div >
                            <span className='iconfont icon-aixin'></span>
                        </div>
                        <p>兴趣</p>
                    </div>
                </div>
                {/* 排行榜 */}
                <div className='teacher-top'>
                    <span>top排行榜</span>
                    <p className='solid'></p>
                    {
                        this.state.top.map(item => {
                            return (
                                <div className='top-box' key={item.id}>
                                    <img src={item.img} alt="" />
                                    <img src={item.img} alt="" />
                                    <p>已报名:{item.num}</p>
                                </div>
                            )
                        })
                    }
                    {/* <div className='top-box'>
                        <img src={img} alt="" />
                        <img src={img} alt="" />
                        <p>已报名2人</p>
                    </div> */}

                </div>
            </div>
        )
    }
}