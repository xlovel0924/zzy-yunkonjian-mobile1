import React, { Component } from 'react';
import Nav from '@/components/nav/nav';
import { withRouter } from 'react-router-dom'

import './index.css';
import yun from '@/assets/img/cloud-memorial/yunzi.png';
import publicityImg from '@/assets/img/cloud-memorial/big-icon.png';


@withRouter
class MemorialPublicity extends Component {
    navigator = () => {
        this.props.history.push('/memorial-home');
    }

    render() {
        return (
            <div className='memorial-publicity' onClick={() => this.navigator()}>
                <Nav ellipsisIsShow={false}/>
                {/* 内容 */}
                <div className='memorial-publictiy-content'>
                    {/* 宣传 */}
                    <div className='publictiy-img'>
                        <img src={publicityImg} />
                    </div>
                    {/* 文字 */}
                    <div className='desc'>以人为本/生命至尊</div>
                </div>
            </div>
        )
    }
}

export default MemorialPublicity;