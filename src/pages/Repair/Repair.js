import React,
{ Component } from 'react'
// import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
import Rate from '../../views/Rate/Rate'
import './Repair.css'
export default class Repair extends Component {
    state = {
        repairList: []//维修列表
    }
    getList() {//获取维修列表
        this.$axios({
            url: API.findRepair
        }).then(res => {
            console.log(res);
            this.state.repairList = res.data.data
            this.setState({})
        })
    }
    toDetail(id) {//跳转详情页
        this.props.history.push('/repair-detail/' + id)
    }
    componentDidMount() {//页面加载执行
        this.getList()
    }
    render() {
        return (
            <div className='repair-box'>
                {/* 顶部 */}
                <div className='repair-title'>
                    <Back />
                    <span>商家列表</span>
                    <span className='iconfont icon-wode'></span>
                </div>
                {/* 维修列表 */}
                <div className='repair-list'>
                    <ul>
                        {
                            this.state.repairList.map(item => {
                                return (
                                    <li className='repair-item' key={item.id} onTouchEndCapture={() => this.toDetail(item.id)}>
                                        <div className='item-left'>
                                            <div>{item.name}<Rate item={item.score} /></div>
                                            <p>{item.type}</p>
                                            <p><span className='iconfont icon-dingwei'></span>{item.address}</p>
                                        </div>
                                        <div className='item-right'>
                                            <div><span className='iconfont icon-dianhua'></span></div>
                                            <p>{item.len}</p>
                                        </div>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            </div>
        )
    }
}