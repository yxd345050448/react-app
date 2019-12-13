import React,
{ Component } from 'react'
// import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import { Carousel, WingBlank } from 'antd-mobile'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
import './Home.css'
import Img from '../../assets/img/home.jpg'
export default class Parent extends Component {
    state = {
        // imgHeight: 176,
        banner: [],//存轮播图
        homeType: []//服务类型
    }
    getBanner() {//获取轮播图
        this.$axios({
            url: API.homeBanner
        }).then(res => {
            console.log(res);
            this.state.banner = res.data.data
            this.setState({})
        })
    }
    getType() {
        this.$axios({
            url: API.getHomeType
        }).then(res => {
            console.log(res);
            res.data.type.map(item => {
                this.state.homeType.push(item)
            })
            console.log(this.state.homeType);

        })
    }
    toDetail1(type) {
        this.props.history.push('/home-list/' + type)
    }
    componentDidMount() {
        this.getBanner()
        this.getType()
    }
    render() {
        var type = this.state.homeType
        console.log(type);

        return (
            <div className='home-box'>
                {/* 顶部 */}
                <div className='home-title'>
                    <Back />
                    <span>找家政</span>
                    <span className='iconfont icon-wode'></span>
                </div>
                {/* 搜索框 */}
                <div className='home-search'>
                    <span className='iconfont icon-RectangleCopy2'></span>
                    <input type="text" placeholder='Search' />
                    <a href="#">我要搜索</a>
                </div>
                {/* 轮播图 */}
                <div className='home-lbt'>
                    <WingBlank>
                        <Carousel autoplay={true} infinite>
                            {this.state.banner.map(item => (
                                <img key={item.id}
                                    src={item.img}
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                />
                            ))}
                        </Carousel>
                    </WingBlank>
                </div>
                {/* 图标 */}
                <div className='home-logo'>
                    <div className='home-minbox' onTouchEndCapture={() => this.toDetail1(type[2])}>
                        <div >
                            <span className='iconfont icon-jiadian'></span>
                        </div>
                        <p>钟点工</p>
                    </div>
                    <div className='home-minbox' onTouchEndCapture={() => this.toDetail1(type[0])}>
                        <div >
                            <span className='iconfont icon-jiazheng'></span>
                        </div>
                        <p>保姆</p>
                    </div>
                    <div className='home-minbox' onTouchEndCapture={() => this.toDetail1(type[1])}>
                        <div >
                            <span className='iconfont icon-icon_xinyong_xianxing_jijin-'></span>
                        </div>
                        <p>月嫂</p>
                    </div>
                    <div className='home-minbox' onTouchEndCapture={() => this.toDetail1(type[3])}>
                        <div >
                            <span className='iconfont icon-jiaju'></span>
                        </div>
                        <p>专业保洁</p>
                    </div>
                    <div className='home-minbox' onTouchEndCapture={() => this.toDetail1(type[4])}>
                        <div >
                            <span className='iconfont icon-jiadian'></span>
                        </div>
                        <p>家电清洗</p>
                    </div>
                    <div className='home-minbox' onTouchEndCapture={() => this.toDetail1(type[5])}>
                        <div >
                            <span className='iconfont icon-jiajuchuang-'></span>
                        </div>
                        <p>家居保养</p>
                    </div>
                    <div className='home-minbox' onTouchEndCapture={() => this.toDetail1(type[6])}>
                        <div >
                            <span className='iconfont icon-jia'></span>
                        </div>
                        <p>新居开荒</p>
                    </div>
                    <div className='home-minbox'>
                        <div >
                            <span className='iconfont icon-gengduo2'></span>
                        </div>
                        <p>更多</p>
                    </div>
                </div>
                {/* 广告 */}
                <div className='home-top'>
                    <div className='top-box'>
                        <img src={Img} alt="" />
                    </div>
                    <div className='top-box'>
                        <img src={Img} alt="" />
                    </div>
                </div>
            </div>
        )
    }
}