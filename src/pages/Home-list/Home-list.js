import React,
{ Component } from 'react'
// import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
import img from '../../assets/img/11.png'
import './Home-list.css'
// import { Toast } from 'antd-mobile'
export default class Parent extends Component {
    state = {
        id: '',
        homeWorker: [],//存相应员工信息
    }
    toDetail(id) {//去详情页
        this.props.history.push('/home-detail/' + id)
    }
    getWorker() {//获取该类型的员工信息
        this.$axios({
            url: API.findHomeWorker,
            method: 'get',
            params: {
                type: this.state.id
            }
        }).then(res => {
            var homeWorker = res.data.data
            homeWorker.forEach(item => {
                if (item.vNum.indexOf('v') == -1) {
                    item.vNum = "v" + item.vNum
                }
            });
            this.setState({
                homeWorker
            })
        })
    }
    componentDidMount() {
        this.state.id = this.props.match.params.id
        this.setState({})
        this.getWorker()
    }
    render() {
        return (
            <div className='homeList-box'>
                {/* 顶部 */}
                <div className='homeList-title'>
                    <Back />
                    <span>{this.state.id}</span>
                    <span className='iconfont icon-RectangleCopy2'></span>
                </div>
                {/* 列表 */}
                <div className='homeList-con'>
                    <ul>
                        {
                            this.state.homeWorker.map(item => {
                                return (
                                    <li className='con-box' key={item.id} onTouchEndCapture={() => this.toDetail(item.id)}>
                                        <div className='con-left'>
                                            <img src={item.img} />
                                        </div>
                                        <div className='con-right'>
                                            <div className='right-name'>{item.name}<span className='right-name-level'>{item.vNum}</span><span className='right-name-price'>￥{item.price}<span>/小时</span></span>
                                            </div>
                                            <p className='right-exp'>{item.city}|{item.age}岁|{item.edu}|{item.year}年经营</p>
                                            <p>资深的{item.type}，毕业于师范{item.edu}，大家都很喜欢他</p>
                                            <p><span className='iconfont icon-shouye'></span>关注{item.readNum}<span className='iconfont icon-aixin'></span>好评{item.likeNum}</p>
                                            <p><span className='iconfont icon-dingwei'></span>距离你{item.len}公里</p>
                                        </div>
                                    </li>
                                )
                            })
                        }

                        {/* <li className='con-box'>
                            <div className='con-left'>
                                <img src={img} />
                            </div>
                            <div className='con-right'>
                                <div className='right-name'>王语嫣<span className='right-name-level'>v3</span><span className='right-name-price'>￥160<span>/小时</span></span>
                                </div>
                                <p className='right-exp'>南京|47岁|大专|3年经营</p>
                                <p>资深的数学高级教师，毕业于师范大学，曾经带过两届高三班，讲课细致耐心学生都很喜欢他的课...</p>
                                <p><span className='iconfont icon-shouye'></span>关注100<span className='iconfont icon-aixin'></span>好评100</p>
                                <p><span className='iconfont icon-dingwei'></span>距离你3.8公里</p>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        )
    }
}