import React,
{ Component } from 'react'
// import { NavLink, Switch, Route, Link, Redirect } from 'react-router-dom'
import Back from '../../views/Back/Back'
import API from '../../util/Api'
// import { Toast } from 'antd-mobile'
import Rate from '../../views/Rate/Rate'
import './Water.css'
export default class Water extends Component {
    state = {
        waterList: []//水站列表
    }
    //获取水站列表
    getList() {
        this.$axios({
            url: API.findWater
        }).then(res => {
            console.log(res)
            this.state.waterList = res.data.data
            this.setState({})
        })
    }
    toWaterDetail(id){
        this.props.history.push('/water-detail/'+id)
    }
    componentDidMount() {
        this.getList()
    }
    render() {
        return (
            <div className='water-box'>
                {/* 顶部 */}
                <div className='water-title'>
                    <Back />
                    <span>送水到家</span>
                    <span className='iconfont icon-wode'></span>
                </div>
                {/* 水站列表 */}
                <div className='water-list'>
                    <ul>
                        {
                            this.state.waterList.map(item => {
                                return (
                                    <li className='water-item' key={item.id} onTouchEndCapture={() => this.toWaterDetail(item.id)}>
                                        <div className='item-left'>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className='item-center'>
                                            <div>{item.name}<Rate item={item.score} /></div>
                                            <p>{item.des}</p>
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