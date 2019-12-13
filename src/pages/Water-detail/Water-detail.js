import React,
{ Component } from 'react'
// import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import img from '../../assets/img/11.png'
import Rate from '../../views/Rate/Rate'
import store from '../../store/index'
import './Water-detail.css'
export default class Parent extends Component {
    state = {
        waterComment: [],//水站评论
        waterList: {

        },//水站详情
        id: ''
    }
    getComment() {//获取水站评论
        this.$axios({
            url: API.findComment,
            method: 'get',
            params: {
                waterId: this.state.id
            }
        }).then(res => {
            console.log(res);
            this.state.waterComment = res.data.data;
            this.setState({})
        })
    }
    setComment(content) {
        this.$axios({
            url: API.addComment,
            method: 'get',
            params: {
                waterId: this.state.id,
                username: store.getState().user.name,
                content: content,
                time: new Date().getTime()
            }
        }).then(res => {
            console.log(res);
            Toast.success(res.data.info)
            this.getComment()
        })
    }
    getList() {//水站
        this.$axios({
            url: API.findWater,
            method: 'get',
            params: {
                id: this.state.id
            }
        }).then(res => {
            console.log(res)
            this.state.waterList = res.data.data[0]
            this.setState({})
        })
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.state.id = this.props.match.params.id
        this.getComment()
        this.getList()
    }

    render() {
        const prompt = Modal.prompt;
        return (
            <div className='waterDetail-box'>
                {/* 顶部 */}
                <div className='waterDetail-title'>
                    <Back />
                    <span>水站详情</span>
                    <span className='iconfont icon-wode'></span>
                </div>
                {/* 水站详情 */}
                <div className='wd-banner'>
                    <div className='banner-left'>
                        <img src={this.state.waterList.img} />
                    </div>
                    <div className='banner-right'>
                        <p>{this.state.waterList.name}</p>
                        <div>
                            <Rate item={this.state.waterList.score} />
                            <span>月售{this.state.waterList.count}桶</span>
                        </div>
                        <p>￥{this.state.waterList.price}元<span>/桶</span></p>
                        <div><span>赞：{this.state.waterList.likeNum}</span><span>浏览数：{this.state.waterList.readNum}</span></div>
                    </div>
                </div>
                {/* 地址电话 */}
                <div className='wd-address'>
                    <div className="address-left">
                        <div><span className='iconfont icon-dingwei'></span>{this.state.waterList.len}</div>
                        <div>{this.state.waterList.address}</div>
                    </div>
                    <div className="address-right">
                        <span className='iconfont icon-dianhua'></span>
                    </div>
                </div>
                {/* 商家信息 */}
                <div className='wd-information'>
                    <div>商家信息</div>
                    <div>{this.state.waterList.des}</div>
                </div>
                {/* 留言 */}
                <div className='wd-comment'>
                    <div className='comment-title'>他们都在说
                        <span className='iconfont icon-combinedshapecopy2' onClick={() => prompt(
                        '评论',
                        '请输入你的评论',
                        [
                            { text: '取消' },
                            {
                                text: '提交', onPress: content => {
                                    this.setComment(content)
                                }
                            },
                        ],
                        'default',
                    )}>写评论</span>
                    </div>
                    <ul>
                        {
                            this.state.waterComment.map(item => {
                                return (
                                    <li key={item.id}>
                                        <div className='comment-img'>
                                            <img src={item.ava || img} alt="" />
                                        </div>
                                        <div className='comment-con'>
                                            <p>{item.name}<span>{item.time}</span></p>
                                            <div>{item.content}</div>
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
                {/* 留言弹窗 */}
                <div>

                </div>
            </div>
        )
    }
}