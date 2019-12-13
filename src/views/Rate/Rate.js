import React,
{ Component } from 'react'
import { Rate } from 'antd';
import './Rate.css'
export default class Parent extends Component {
    render() {
        console.log(typeof this.props.item);
        return (
            <Rate className='item-rate' disabled allowHalf value={parseFloat(this.props.item)} />
        )
    }
}