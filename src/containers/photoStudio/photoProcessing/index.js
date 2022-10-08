import React, { Component, Fragment } from 'react';
import Nav from '../../../components/nav/nav';
import './index.css';
import { withRouter } from 'react-router-dom';
import GeneralBackGround from '../../../components/GeneralBackGround';


@withRouter
class PhotoProcessing extends Component {
  state = {
    moduleList: [
      { status: 1, bigtitle: '黑白照片上色', smalltitle: '黑白照片变彩色', imgUrl: require('../../../assets/img/yun-photo/color.png') },
      { status: 2, bigtitle: '模糊照片上色', smalltitle: '模糊照片变清晰', imgUrl: require('../../../assets/img/yun-photo/vague.png') },
    ]
  }

  pageNavigator = (url) => {
    this.props.history.push(url)
  }

  render() {
    return (
      <div className='photo-processing'>
        <GeneralBackGround>
          {/* 头部 */}
          <Nav title={"老照片修复"} ellipsisIsShow={false} />
          {/* 功能模块 */}
          <div className='photo-processing-content'>
            <ul>
              {this.state.moduleList.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <li className='item' onClick={() => this.pageNavigator(`/photo-color-repair/${item.status}`, item.status)}>
                      <div className='big-title'>{item.bigtitle}</div>
                      <div className='small-desc'>{item.smalltitle}</div>
                      <img src={item.imgUrl} />
                    </li>
                  </Fragment>
                )
              })}
            </ul>
            {/* 操作 */}
            <div className='photo-processing-options'>
              <span>至尊园或者静园客户如需墓碑照片精修请联系</span>
              <span>"售后热线电话 59834448"</span>
            </div>
          </div>
        </GeneralBackGround>
      </div>
    )
  }
}

export default PhotoProcessing;