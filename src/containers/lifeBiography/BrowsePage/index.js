import React, { Component } from 'react';
import './index.css';
import Nav from '@/components/nav/nav';
import TabBar from '@/components/tabbar/index';
import { getBiographyID } from '@/server/lifeBiography';
import HasTabBarBackGround from '../../../components/HasTabBarBackGround';

export class BiographyBrowse extends Component {
  state = {
    biographyDetails: {}
  }
  componentDidMount() {
    this.getBiographyDetails();
  }

  getBiographyDetails = () => {
    const id = this.props.match.params.id.replace(':', '').trim();
    getBiographyID(id).then(res => {
      if (res.status === 200) {
        console.log(res)
        this.setState({
          biographyDetails: res.data.data
        })
      }
    })
  }
  render() {
    console.log(this.state.biographyDetails)
    return (
      <div className='biography-browse'>
        <HasTabBarBackGround>
          <div>
            {/* 头部 */}
            <Nav title={"生平传记"} ellipsisIsShow={false} />
            {/* 内容 */}
            <div className='browse-content'>
              <div className='infos Light'>{this.state.biographyDetails.biographyContent}</div>
            </div>
          </div>
        </HasTabBarBackGround>
        {/* 底部 */}
        <TabBar />
      </div>
    )
  }
}

export default BiographyBrowse;
