import React,
{ Component } from 'react'
// import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
import Rate from '../../views/Rate/Rate'
import './Repair-detail.css'
import img from '../../assets/img/11.png'
// import { Toast } from 'antd-mobile'
export default class Parent extends Component {
    state = {
        repairList: {},//维修详情
        repairComment: [],//维修评论
        id: ''
    }
    getList() {//获取维修列表
        this.$axios({
            url: API.findRepair,
            method: 'get',
            params: {
                id: this.state.id
            }
        }).then(res => {
            console.log(res);
            this.state.repairList = res.data.data[0]
            this.setState({})
        })
    }
    getComment() {//获取维修评论
        this.$axios({
            url: API.findRepairComment,
            method: 'get',
            params: {
                repairId: this.state.id
            }
        }).then(res => {
            console.log(res);
            this.state.repairComment = res.data.data
            this.setState({})
        })
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.state.id = this.props.match.params.id;
        this.getList()//维修详情
        this.getComment()//维修评论
    }

    render() {
        var item = this.state.repairList
        return (
            <div className='repairDetail-box'>

                <div className='repairDetail-title'>
                    <Back />
                    <span>商家详情</span>
                    <span className='iconfont icon-wode'></span>
                </div>
                {/* 信息 */}
                <div className='repairDetail-top'>
                    <div className='top-title'>{item.name}<Rate item={item.score} /></div>
                    <div className="top-con">
                        <p>
                            <span className='iconfont icon-dingwei'></span>
                            距你{item.len}</p>
                        <p>{item.address}</p>
                        <p>营业时间：09:00-18:00</p>
                        <div className='top-btn'>
                            <button>关注</button>
                            <button>向Ta提问</button>
                        </div>
                        <p className='top-bot'>关注：{item.readNum}<span>好评：{item.likeNum}</span>
                        </p>
                    </div>
                </div>
                {/* 商家信息 */}
                <div className='repairDetail-information'>
                    <div>商家信息</div>
                    <div>{item.name}主营：{item.type}</div>
                </div>
                {/* 留言 */}
                <div className='repairDetail-comment'>
                    <div className='comment-title'>他们都在说
                        <span className='iconfont icon-combinedshapecopy2'>写评论</span>
                    </div>
                    <ul>
                        {
                            this.state.repairComment.map(item1 => {
                                return (
                                    <li key={item1.id}>
                                        <div className='comment-img'>
                                            <img src={item1.ava||img} />
                                        </div>
                                        <div className='comment-con'>
                                            <p>{item1.name}<span>{item1.time}</span></p>
                                            <div>{item1.content}</div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        {/* <li>
                            <div className='comment-img'>
                                <img src={img} alt="" />
                            </div>
                            <div className='comment-con'>
                                <p>娃娃脸<span>1小时前</span></p>
                                <div>这家水店服务特别好，送水速度快，水喝着也不错，而且还经济实惠。。。</div>
                            </div>
                        </li> */}

                    </ul>
                </div>
            </div>
        )
    }
}