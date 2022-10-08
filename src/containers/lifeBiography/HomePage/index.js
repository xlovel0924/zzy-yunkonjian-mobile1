import React, { Component, Fragment } from 'react';
import './index.css';
import nextIcon from '@/assets/img/life-biography/next-icon.png'
import Nav from '@/components/nav/nav';
import TabBar from '@/components/tabbar/index';
import { getLifeBiography, getBiographyID } from '@/server/lifeBiography';
import { withRouter } from 'react-router-dom';
import collentIcon from '@/assets/img/life-biography/collent.png';
import commentIcon from '@/assets/img/life-biography/comment.png';
import headerImg from '@/assets/img/life-biography/headportrait.png';
import HasTabBarBackGround from '../../../components/HasTabBarBackGround';
import lishizhen from '@/assets/img/life-biography/lishizhen.jpg'

@withRouter
class BiographyHome extends Component {
  state = {
    count: ['1', '2', '3', '4', '5', '6'],
    // 生平信息集合
    biographyList: [],
    // 默认生平信息第一条数据集合
    defaultBiograpList: [],
    differenceTime: '',
    biographyTime: '',
    timeSpanStr: ''
  }


  componentDidMount() {
    this.getBiographyList();
  }
  // 获取所有生平信息
  getBiographyList = () => {
    getLifeBiography({}).then(res => {
      if (res.status === 200) {
        if (res.data.data.records.length > 0) {
          this.setState({
            biographyList: res.data.data.records,
            defaultBiograpList: res.data.data.records[0],
            // differenceTime: res.data.data.records[0].biographyTime.replace(/-/g, '/')
          })
        }


        //     const t1 = this.state.differenceTime;
        //     console.log(t1)
        //     const t2 = Date.parse(t1)
        //     const t3 = new Date(t2)
        //     const no1new = t3.valueOf();
        //     const year = t3.getFullYear();
        //     const month = t3.getMonth() + 1;
        //     const day = t3.getDate();
        //     const hour = t3.getHours();
        //     const minute = t3.getMinutes();
        //     const second = t3.getSeconds();
        //     const now = new Date();
        //     const now_new = now.valueOf();  //typescript转换写法

        //     var milliseconds = 0;

        //     milliseconds = now_new - no1new;
        //     console.log(milliseconds)

        //     if (milliseconds <= 1000 * 60 * 1) {
        //       this.setState({
        //         timeSpanStr: '刚刚'
        //       })
        //     }
        //     else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        //       this.setState({
        //         timeSpanStr: Math.round((milliseconds / (1000 * 60))) + '分钟前'
        //       })
        //     }
        //     else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        //       this.setState({
        //         timeSpanStr: Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
        //       })
        //     }
        //     else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        //       this.setState({
        //         timeSpanStr: Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
        //       })
        //     }
        //     else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        //       this.setState({
        //         timeSpanStr: month + '-' + day + ' ' + hour + ':' + minute

        //       })
        //     } else {
        //       this.setState({
        //         timeSpanStr: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
        //       })
        //     }
        //     return this.state.timeSpanStr;
      }
    })
  }

  // 根据id跳转
  lookBiograpInfos = (id) => {
    this.props.history.push(`/biography-browse/${id}`,)
  }

  render() {


    return (
      <div className='biography-home'>
        <HasTabBarBackGround>
          {/* 头部 */}
          <Nav title={"生平传记"} ellipsisIsShow={false} />
          {/* 内容 */}
          <div className='biography-home-content'>
            <div className='part-one'>
              <img src={lishizhen} />
            </div>
            {this.state.biographyList.length > 0
              ? <div className='part-two'>
                {/* 用户信息 */}
                <div className='user'>
                  {/* <img src={this.state.defaultBiograpList.memorialsUrl ? this.state.defaultBiograpList.memorialsUrl : headerImg} /> */}
                  <div className='nickname'>{this.state.defaultBiograpList.memorialsName}</div>
                  <span className='recommend Regular'>推荐</span>
                </div>
                {/* 推荐事迹 */}
                <div className='biography-home-deeds'>
                  <div className='item' onClick={() => this.lookBiograpInfos(this.state.defaultBiograpList.id)}>
                    <div className='left'>
                      <span className='small-title'>事迹：</span>
                      <span className='desc Regular ellipsis'>{this.state.defaultBiograpList.biographyTitle}</span>
                    </div>
                    <div className='right'>
                      <img src={nextIcon} />
                    </div>
                  </div>
                </div>

                {/* 所有事迹 */}
                <div className='biography-home-deeds' style={{ marginTop: '30px' }}>
                  {this.state.biographyList.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <div className={`item part${index}`} onClick={() => this.lookBiograpInfos(item.id)}>
                          <div className='left'>
                            <span className='small-title'>事迹：</span>
                            <span className='desc Regular ellipsis'>{item.biographyTitle}</span>
                          </div>
                          <div className='right'>
                            <img src={nextIcon} />
                          </div>
                        </div>
                      </Fragment>
                    )
                  })}
                </div>
                {/* 操作 */}
                <div className='biography-home-options'>
                  <div className='all'>{this.state.biographyList.length > 8 ? '全部' : ''}</div>
                  <div className='bottom'>
                    <div className='left'>{this.state.timeSpanStr}</div>
                    <div className='right'>
                      {/* <div className='item part1'>
                      <img src={commentIcon} />
                      <span>1</span>
                    </div>
                    <div className='item part2'>
                      <img src={collentIcon} />
                      <span>20</span>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              : <div className='no-content Regular'>暂无事迹信息</div>
            }
          </div>
        </HasTabBarBackGround>
        {/* 底部 */}
        <TabBar />
      </div>
    )
  }
}

export default BiographyHome;
