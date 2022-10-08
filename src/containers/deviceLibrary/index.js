import React from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import { connect } from 'react-redux';
import history from "@/history";
import BScroll from "better-scroll";
import { Icon } from 'antd-mobile';
import { withRouter, Redirect, Link } from "react-router-dom";
import { findAll, clearDeviceList } from '@/redux/deviceLibrary/deviceLibrary.action';
// import { goods } from "@/utils";
import Head from "@/components/head";
import icon from "@/assets/img/bg.png";
import iconSBYT from "@/assets/img/iconSBYT.svg";
import "./index.css";

// 事件上报, 设备报修详情页面
@connect(
  state=>({ deviceLibrary:state.deviceLibrary }),
  { findAll, clearDeviceList }
)
@withRouter
class DeviceLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listHeight: [],
      currentIndex: 0,
      scrollY: 0,
      alldeviceType: [],  // 所有设备分类和分类下的用途
    };
    this.handleBack = this.handleBack.bind(this);
    this.deviceWrapper = (ref) => {
      this.devicesWrapper = ref;
    };
    this.menuWrapper = (ref) => {
      this.menusWrapper = ref;
    };
  }

  
  componentDidMount() {
    this.props.clearDeviceList();
    this.props.findAll();
    this.initScroll();
    setTimeout(() => {
      this.calculateHeight();
    }, 1000);
    // this.calculateHeight();
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.deviceLibrary)){
        this.setState({
          alldeviceType: nextProps.deviceLibrary.allDeviceType
        })
      }
    }
  }

  selectMenu(index, e) {
    this.setState({
      currentIndex: index,
    });
    if (!this.devicesWrapper) return;
    const listNode = this.devicesWrapper ? this.devicesWrapper.childNodes : [];
    const items = listNode[0].childNodes[index];
    this.deviceScroll.scrollToElement(items, 300);
  }

  currentIndex() {
    for (let i = 0; i < this.state.listHeight.length; i++) {
      let height1 = this.state.listHeight[i];
      let height2 = this.state.listHeight[i + 1];
      if (
        !height2 ||
        (this.state.scrollY >= height1 && this.state.scrollY < height2)
      ) {
        this.followScroll(i);
        this.setState({
          currentIndex: i,
        });
        return i;
      }
    }
  }

  initScroll() {
    this.meunScroll = new BScroll(this.menusWrapper, {
      click: true,
    });
    this.deviceScroll = new BScroll(this.devicesWrapper, {
      click: true,
      probeType: 3,
    });
    this.deviceScroll.on("scroll", (pos) => {
      // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
      if (pos.y <= 0) {
        this.setState({
          scrollY: Math.abs(Math.round(pos.y)),
        });
        this.currentIndex();
      }
    });
  }

  calculateHeight() {
    const listNode = this.devicesWrapper  ? this.devicesWrapper.childNodes : [];
    let height = 0;
    // 计算每一个分类的高度
    this.state.listHeight.push(height);
    for (let i = 0; i < listNode[0].childNodes.length; i++) {
      height += listNode[0].childNodes[i].clientHeight;
      this.state.listHeight.push(height);
    }
  }

  followScroll(index) {
    const menuNode = this.menusWrapper ? this.menusWrapper.childNodes : [];
    if(!_.isEmpty(menuNode[0])){
      let menuList = menuNode[0].childNodes[index];
      this.meunScroll.scrollToElement(menuList, 300, 0, -100);
    }
  }

  // handleSelect(v) {
  //   console.log(this.props);
  //   this.props.history.push({ pathname: `/deviceList/1/2`, state: { ...v } });
  // }

  handleBack = () => {
    history.goBack();
  };

  render() {
    const { alldeviceType } = this.state;
    // console.log('alldeviceType---------------------')
    // console.log(alldeviceType)
    return (
      <div className="r-body">
        <Head title='设备资料库' handleBack={this.handleBack}></Head>
        <div className="deviceLibrary-content">
          <div className="menu-wrapper" ref={this.menuWrapper}>
            <ul>
              {alldeviceType &&
                alldeviceType.map((item, index) => (
                  <li
                    key={index}
                    className={`menu-item ${
                      index === this.state.currentIndex ? "current" : ""
                    }`}
                    onClick={(e) => this.selectMenu(index, e)}
                  >
                    <span className="text border">{item.name}</span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="devices-wrapper" ref={this.deviceWrapper}>
            <ul>
              {alldeviceType &&
                alldeviceType.map((item, index) => (
                  <li key={index} className="device-list" style={{minHeight:(index===alldeviceType.length-1)?'calc(100vh - 76px)':'0px'}}>
                    <h1 className="title">{item.name}</h1>
                    <ul>
                      {!_.isEmpty(item.children)?item.children.map((item, index) => (
                        <Link
                          to={`/devicelist/${item.id}/${item.parentId}`}
                        >
                          <li key={index} className="device-item border">
                            <div className="icon">
                              <img width="36" height="36" alt="" src={iconSBYT} />
                            </div>
                            <div
                              className="content"
                              // onClick={() => this.handleSelect(item)}
                            >
                              <h2 className="name">{item.name}</h2>
                            </div>
                            <div style={{float:'right', paddingTop:4}}>
                              <Icon type='right' />
                            </div>
                          </li>
                        </Link>
                      )):
                        <li key={index} className="device-item border">
                          <div className="icon">
                            <img width="36" height="36" alt="" src={iconSBYT} />
                          </div>
                          <div
                            className="content"
                            // onClick={() => this.handleSelect(item)}
                          >
                            <h2 className="name" style={{color:'#ccc', lineHeight:'30px'}}>暂无用途信息</h2>
                          </div>
                        </li>
                      }
                    </ul>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceLibrary;

