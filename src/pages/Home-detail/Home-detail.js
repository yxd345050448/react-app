import React,
{ Component } from 'react'
// import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
import './Home-detail.css'
import img from '../../assets/img/11.png'
import Index from '../Index/Index'
// import { Toast } from 'antd-mobile'
export default class Parent extends Component {
    state = {
        id: '',
        homeWorker: {},//当前员工信息
        qualification: [],//资格认证
        type: []//服务类型
    }
    getWorker() {//获取该类型的员工信息
        this.$axios({
            url: API.findHomeWorker,
            method: 'get',
            params: {
                id: this.state.id
            }
        }).then(res => {
            console.log(res);
            var homeWorker = res.data.data[0]
            if (homeWorker.qualification.includes('[')) {
                var qualification = JSON.parse(homeWorker.qualification)
                console.log(qualification);
            } else {
                var qualification = homeWorker.qualification.split(",")
            }
            if (homeWorker.type.includes('[')) {
                var type = JSON.parse(homeWorker.type)
                console.log(type);

            } else {
                var type = homeWorker.type.split(',')
            }
            this.setState({
                homeWorker,
                qualification,
                type
            })
        })
    }
    componentDidMount() {//页面加载执行
        this.state.id = this.props.match.params.id
        this.setState({})
        this.getWorker()
    }
    render() {
        var item = this.state.homeWorker
        console.log(item);

        return (
            <div className='homeDetail-box'>
                {/* 顶部 */}
                <div className='homeDetail-title'>
                    <Back />
                    <span>王语嫣</span>
                    <span className='iconfont icon-wode'></span>
                </div>
                {/* 家政详情 */}
                <div className='homeDetail-banner' onTouchEndCapture={() => this.toDetail()}>
                    <div className='banner-left'><img src={item.img} /></div>
                    <div className='banner-right'>
                        <div className='right-name'>{item.name}<span className='right-name-level'>{item.vNum}</span><span className='right-name-price'>￥{item.price}<span>/小时</span></span>
                        </div>
                        <p className='right-exp'>{item.city}|{item.age}岁|{item.edu}|{item.year}年经营</p>
                        <div className='right-btn'>
                            <button>关注</button>
                            <button>向Ta提问</button>
                        </div>
                        <div className='right-bottom'><span className='iconfont icon-shouye'></span>关注{item.readNum}<span className='iconfont icon-aixin'></span>好评{item.likeNum}<span className='iconfont icon-dingwei'></span>距离你{item.len}公里</div>
                    </div>
                </div>
                {/* 家政简介 */}
                <div className='homeDetail-con'>
                    <p className='homeDetail-con-title'>简介</p>
                    <p>资格认证：{
                        this.state.qualification.map((i, index) => {
                            return (
                                <span> <span className='iconfont icon-RectangleCopy1' key={index}></span> {i}</span>
                            )
                        })
                    }</p>
                    <p>服务项目：{
                        this.state.type.map((i, index) => {
                            return (
                                <span> <span className='iconfont icon-RectangleCopy1' key={index}></span> {i}</span>
                            )
                        })
                    }</p>
                    <p>自我评价：干净利落，形象好，有爱心，责任心，服务意识强</p>
                    <p>曾辉毕业于河北师范大学，资深的数学高级教师，毕业于师范大学，曾经带过两届高三班，讲课细致耐心学生都很喜欢他的课....</p>
                </div>
                {/* 留言 */}
                <div className='homeDetail-comment'>
                    <div className='comment-title'>雇主评价
                        <span className='iconfont icon-combinedshapecopy2'>写评论</span>
                    </div>
                    <ul>
                        <li>
                            <div className='comment-img'>
                                <img src={img} alt="" />
                            </div>
                            <div className='comment-con'>
                                <p>娃娃脸<span>1小时前</span></p>
                                <div>干净利落，形象好，有爱心，责任心，服务意识强</div>
                            </div>
                        </li>
                        <li>
                            <div className='comment-img'>
                                <img src={img} alt="" />
                            </div>
                            <div className='comment-con'>
                                <p>娃娃脸1231<span>1小时前</span></p>
                                <div>干净利落，形象好，有爱心，责任心，服务意识强</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}