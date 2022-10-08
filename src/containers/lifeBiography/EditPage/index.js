import React, { Component, Fragment } from 'react';
import Nav from '@/components/nav/nav';
import TabBar from '@/components/tabbar/index';

import './index.css';
import nextIcon from '@/assets/img/life-biography/next-icon.png';

export class BiographyEdit extends Component {
  state = {
    count: ["1", "2", "3", "4", "5", "6"]
  }
  render() {
    return (
      <div className='biography-edit'>
        {/* 头部 */}
        <Nav title={"生平传记"} />
        {/* 内容 */}
        <div className='edit-content'>
          {/* 发生时间 */}
          <div className='item occurrence-time'>
            <div className='small-title'>发生时间：</div>
            <input type="text" placeholder="请选择时间" />
          </div>
          {/* 主题 */}
          <div className='item theme'>
            <div className='small-title'>主题：</div>
            <input type="text" placeholder="请输入主题名称" />
          </div>
          {/* 内容 */}
          <textarea placeholder='请输入传记内容' />
          {/* 事迹 */}
          <div className='deeds'>
            <div className='top'>
              {this.state.count.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div className='item'>
                      <div className='left'>
                        <span className='small-title'>事迹：</span>
                        <span className='desc'>XXXXX</span>
                      </div>
                      <div className='right'>
                        <img src={nextIcon} />
                      </div>
                    </div>
                  </Fragment>
                )
              })}
            </div>
            <div className='all'>全部</div>
          </div>
          {/* 提交 */}
          <div className='submit'>
            <button className='submit-update'>修改传记</button>
            <button className='submit-save'>保存传记</button>
          </div>
        </div>
        {/* 底部 */}
        <TabBar />
      </div>
    )
  }
}

export default BiographyEdit;
