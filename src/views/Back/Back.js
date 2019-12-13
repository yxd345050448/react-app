import React,
{ Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Icon } from 'antd'
import './Back.css'
class Back extends Component {
    goBack() {
        this.props.history.go(-1)
    }
    render() {
        return (
            <div className='back' onTouchEndCapture={() => this.goBack()}>
                <Icon type="rollback" className='goback' />
            </div>
        )
    }
}
export default withRouter(Back)