import { withRouter, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Form from '@/components/form';
import BScroll from 'better-scroll';
import { connect } from 'react-redux';
import "./index.css";
import { fetchProductList, fetchTaoCanList, fetchMyDiyList, deleteMyDiy, saveMyDiy } from '@/redux/diyMuBei/diyMuBei.action';
import { Icon, List, Switch, Tabs, Modal, InputItem, Button, Toast, DatePicker } from 'antd-mobile';
import kefu from '@/assets/img/homeimg/kefua.png';
import yuyue from '@/assets/img/homeimg/yuyue.png';
import phone from '@/assets/img/homeimg/pone.png';
import xila from '@/assets/img/homeimg/xila.png';
import shangla from '@/assets/img/homeimg/shangla.png';
import Head from '@/components/head';
import history from '@/history';
import DIY from '@/assets/img/homeimg/DIY.png';


import Code from '@/components/code'

import keFuIcon from '@/assets/img//keFuIcon.png';
import chanPinIcon from '@/assets/img//chanPinIcon.png';
import baoCunIcon from '@/assets/img//baoCunIcon.png';
import fangAnIcon from '@/assets/img//fangAnIcon.png';
import phoneIcon from '@/assets/img//phoneIcon.png';

import bottomPhone from '@/assets/img/phone.png';
import myDiyImg from '@/assets/img/shopping.png';
import _ from 'lodash';
import { smallOwnersUrl } from '@/server/service';
import moment from 'moment';

import Websocket from 'react-websocket';
import { relativeTimeThreshold } from 'moment';

 const webSocketIp = '192.168.10.92:8081';

// state=>({ ship:state.ship , fishing:state.fishing, alarm:state.alarm}),
//   { clearAisHistory, findAisHistory, showOtherShips, findHistory24h }

@connect(
  state => ({ diyMuBei: state.diyMuBei, user: state.user }),
  { fetchProductList, fetchTaoCanList, fetchMyDiyList, deleteMyDiy, saveMyDiy }
)
@Form
@withRouter
class diymuxue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // top: "-14.813333rem",
      topjudge: false,
      deleteDitModalVisible: false,
      showMyDiy: false,
      showItemsTabs: false,
      saveModalVisible: false,  // 保存弹窗
      showServices: false,  // 客服弹窗
      yuYueModalVisible: false, // 预约看墓弹窗
      myDiyOkVisible:false, // diy方案保存成功确认提示
      chosedMuBei: { id: '' }, // 选择的墓碑
      chosedPhoto: { id: '' }, // 选择的相框
      chosedLeftTree: { id: '' }, // 左侧树
      chosedRightTree: { id: '' }, // 左侧树
      chosedLeftItem: { id: '' }, // 左前小品
      chosedRightItem: { id: '' }, // 右前小品
      chosedFontText: { id: '' },  // 正面文字
      chosedBackText: { id: '' },  // 背面文字
      chosedDesktopText: { id: '' },  // 背面文字
      chosedTaoCan: { id: '' },  // 套餐
      useTaoCan: false, // 是否使用套餐数据
      tabsPage:0,   // 商品tabs页数


      fangAnName: '',  // 方案名称

      willDeleteMyDiy: {}, // 准备删除的方案
      socketConnected: false, // 未连接

      itemTabs: [
        { title: '套餐', value: [] },
        { title: '墓碑', value: [] },
        { title: '相框', value: [] },
        { title: '左侧树', value: [] },
        { title: '右侧树', value: [] },
        { title: '左侧小品', value: [] },
        { title: '右侧小品', value: [] },
        { title: '正面文字', value: [] },
        { title: '背面文字', value: [] },
        { title: '台面文字', value: [] },
      ],  // 不要改动
      myDiyList: [],
      yuYueName:'', // 预约看墓用户名
      mobilePhone:'',  // 用户电话
      xiaoShouName:'', // 销售名字
      xiaoShouPhone:'', // 销售电话
      yuYueTime:'', // 预约时间
      personNum:'', // 同行人数
      code: '',     // 验证码
    }
    this.taskWrapper = ref => { this.taskWrappers = ref };
  }


  componentDidMount() {

    // const {socketConnected} = this.setState;
    // if(!socketConnected){
    //   const userName = JSON.parse(sessionStorage.getItem('name'));
    //   const userPhone = JSON.parse(sessionStorage.getItem('phone'));
      
    //   var socket = new WebSocket(`ws://${webSocketIp}/wspush?xsId=1&type=0&name=${userName}&iphone=${userPhone}`);
    //   this.setState({
    //     socketConnected: true
    //   })
    //   socket.onopen=function(event){
    //     console.log('建立连接')
    //   }
    //   socket.onmessage=function(event){
    //     // console.log('onMessage ====')
    //     // console.log(event.data)
    //     var ifr = document.getElementById("iframe3D_MuBei");
    //     // console.log(event.data);
    //     ifr.src = event.data;
    //   }
    // }
    

    // console.log('this.props0000000000')
    // console.log(this.props)
    let { itemTabs } = this.state;
    itemTabs.map((e, index) => {
      if (e.title === '墓碑') {
        itemTabs[index].value = this.props.diyMuBei.muBeiList
      } else if (e.title === '相框') {
        itemTabs[index].value = this.props.diyMuBei.photoList
      } else if (e.title === '左侧树') {
        itemTabs[index].value = this.props.diyMuBei.treeList
      } else if (e.title === '右侧树') {
        itemTabs[index].value = this.props.diyMuBei.treeList
      } else if (e.title === '左侧小品') {
        itemTabs[index].value = this.props.diyMuBei.itemsList
      } else if (e.title === '右侧小品') {
        itemTabs[index].value = this.props.diyMuBei.itemsList
      } else if (e.title === '正面文字') {
        itemTabs[index].value = this.props.diyMuBei.textList
      } else if (e.title === '背面文字') {
        itemTabs[index].value = this.props.diyMuBei.textList
      } else if (e.title === '台面文字') {
        itemTabs[index].value = this.props.diyMuBei.textList
      } else if (e.title === '套餐') {
        itemTabs[index].value = this.props.diyMuBei.taoCanList
      }
    })

    this.initScroll();
    // 请求产各种类型品列表
    this.props.fetchProductList(
      { typeName: '墓碑' }
    );
    this.props.fetchProductList(
      { typeName: '小树' }
    );
    this.props.fetchProductList(
      { typeName: '小品' }
    );
    this.props.fetchProductList(
      { typeName: '文字' }
    );
    this.props.fetchProductList(
      { typeName: '相框' }
    );
    // 请求套餐
    this.props.fetchTaoCanList({ typeName: '套餐' })
  }

  componentWillUnmount(){
    this.setState({
      socketConnected:false
    })
  }

  initScroll() {
    this.taskScroll = new BScroll(this.taskWrappers, {
      click: true,
      probeType: 3
    });
    // console.log(this.alarmDetailScroll);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps--------------');
    // console.log(nextProps);
    let { itemTabs } = this.state;
    itemTabs.map((e, index) => {
      if (e.title === '墓碑') {
        itemTabs[index].value = nextProps.diyMuBei.muBeiList
      } else if (e.title === '相框') {
        itemTabs[index].value = nextProps.diyMuBei.photoList
      } else if (e.title === '左侧树') {
        itemTabs[index].value = nextProps.diyMuBei.treeList
      } else if (e.title === '右侧树') {
        itemTabs[index].value = nextProps.diyMuBei.treeList
      } else if (e.title === '左侧小品') {
        itemTabs[index].value = nextProps.diyMuBei.itemsList
      } else if (e.title === '右侧小品') {
        itemTabs[index].value = nextProps.diyMuBei.itemsList
      } else if (e.title === '正面文字') {
        itemTabs[index].value = nextProps.diyMuBei.textList
      } else if (e.title === '背面文字') {
        itemTabs[index].value = nextProps.diyMuBei.textList
      } else if (e.title === '台面文字') {
        itemTabs[index].value = nextProps.diyMuBei.textList
      } else if (e.title === '套餐') {
        itemTabs[index].value = nextProps.diyMuBei.taoCanList
      }
    })
    this.setState({
      myDiyList: nextProps.diyMuBei.myDiyList
    })
    // console.log('nextProps---------报警轨迹页')
    // console.log(nextProps)
  }

  handleBack = () => {
    history.goBack();
  }
  handlePush(v) {
    this.props.history.push(v)
  }
  dowdasd(a) {
    if (a === "bottom") {
      // true
      this.setState({
        topjudge: true
      })
    } else {
      // false
      this.setState({
        // top: "0",
        topjudge: false
      })
    }
  }

  // 小品选择弹窗开关
  handleItemTabs = () => {
    this.setState({
      showItemsTabs: !this.state.showItemsTabs
    })
    if (!this.state.showItemsTabs) {
      // 打开饰品列表
    }
  }

  // 项子页面发送信息
  sendMessage = (value) => {
    // console.log(value)
    // if (value) {
    const childFrame = document.getElementById('iframe3D_MuBei');
    childFrame.contentWindow.postMessage(value, '*');
    // }
  }

  // 选择饰品或套餐
  handleSwitchChange = (flag, type, e) => {
    if (!flag) {
      this.setState({
        useTaoCan: false
      })
      if (type === '墓碑') {
        this.setState({
          chosedMuBei: { id: '' }
        })
      } else if (type === '相框') {
        this.setState({
          chosedPhoto: { id: '' }
        })
      } else if (type === '左侧树') {
        this.setState({
          chosedLeftTree: { id: '' }
        })
      } else if (type === '右侧树') {
        this.setState({
          chosedRightTree: { id: '' }
        })
      } else if (type === '左侧小品') {
        this.setState({
          chosedLeftItem: { id: '' }
        })
      } else if (type === '右侧小品') {
        this.setState({
          chosedRightItem: { id: '' }
        })
      } else if (type === '正面文字') {
        this.setState({
          chosedFontText: { id: '' }
        })
      } else if (type === '背面文字') {
        this.setState({
          chosedBackText: { id: '' }
        })
      } else if (type === '台面文字') {
        this.setState({
          chosedDesktopText: { id: '' }
        })
      } else if (type === '套餐') {
        this.setState({
          chosedTaoCan: { id: '' }
        })
      }
    } else {
      {
        if (type === '墓碑') {
          this.setState({
            chosedMuBei: e
          })
        } else if (type === '相框') {
          this.setState({
            chosedPhoto: e
          })
        } else if (type === '左侧树') {
          this.setState({
            chosedLeftTree: e
          })
        } else if (type === '右侧树') {
          this.setState({
            chosedRightTree: e
          })
        } else if (type === '左侧小品') {
          this.setState({
            chosedLeftItem: e
          })
        } else if (type === '右侧小品') {
          this.setState({
            chosedRightItem: e
          })
        } else if (type === '正面文字') {
          this.setState({
            chosedFontText: e
          })
        } else if (type === '背面文字') {
          this.setState({
            chosedBackText: e
          })
        } else if (type === '台面文字') {
          this.setState({
            chosedDesktopText: e
          })
        } else if (type === '套餐') {
          this.setState({
            chosedTaoCan: e
          });
          // 先清除所有模型
          const payload = {
            functionName: 'renderModel',
            type: 'clearAll',
          }
          this.sendMessage(JSON.stringify(payload));
          this.setState({
            chosedMuBei: { id: '' }, // 选择的墓碑
            chosedPhoto: { id: '' }, // 选择的相框
            chosedLeftTree: { id: '' }, // 左侧树
            chosedRightTree: { id: '' }, // 左侧树
            chosedLeftItem: { id: '' }, // 左前小品
            chosedRightItem: { id: '' }, // 右前小品
            chosedFontText: { id: '' },  // 正面文字
            chosedBackText: { id: '' },  // 背面文字
            chosedDesktopText: { id: '' },  // 背面文字
          })
          // 请求某套餐下的所有产品
          fetch(smallOwnersUrl(`commodity/comboMeal/get/${e.id}`), {
            method: 'GET',
          }).then(function (response) {
            return response.json();
          }).then((e) => {
            console.log(e)
            if (e.flag) {
              if (!_.isEmpty(e.data.comboParticularsVOS)) {
                e.data.comboParticularsVOS.map(item => {
                  console.log('item');
                  console.log(item);
                  if (item.placeLocation === '墓碑') {
                    this.setState({
                      chosedMuBei: {...item, price:item.prices}
                    });
                    const sendData = item
                    const payload = {
                      functionName: 'renderModel',
                      type: item.placeLocation,
                      data: sendData
                    }
                    this.sendMessage(JSON.stringify(payload));
                  } else if (item.placeLocation === '相框') {
                    this.setState({
                      chosedPhoto: {...item, price:item.prices}
                    });
                    const sendData = item
                    const payload = {
                      functionName: 'renderModel',
                      type: item.placeLocation,
                      data: sendData
                    }
                    this.sendMessage(JSON.stringify(payload));
                  } else if (item.placeLocation === '左侧树') {
                    this.setState({
                      chosedLeftTree: {...item, price:item.prices}
                    });
                    const sendData = item
                    const payload = {
                      functionName: 'renderModel',
                      type: item.placeLocation,
                      data: sendData
                    }
                    this.sendMessage(JSON.stringify(payload));
                  } else if (item.placeLocation === '右侧树') {
                    this.setState({
                      chosedRightTree: {...item, price:item.prices}
                    });
                    const sendData = item
                    const payload = {
                      functionName: 'renderModel',
                      type: item.placeLocation,
                      data: sendData
                    }
                    this.sendMessage(JSON.stringify(payload));
                  } else if (item.placeLocation === '左侧小品') {
                    this.setState({
                      chosedLeftItem: {...item, price:item.prices}
                    });
                    const sendData = item
                    const payload = {
                      functionName: 'renderModel',
                      type: item.placeLocation,
                      data: sendData
                    }
                    this.sendMessage(JSON.stringify(payload));
                  } else if (item.placeLocation === '右侧小品') {
                    this.setState({
                      chosedRightItem: {...item, price:item.prices}
                    });
                    const sendData = item
                    const payload = {
                      functionName: 'renderModel',
                      type: item.placeLocation,
                      data: sendData
                    }
                    this.sendMessage(JSON.stringify(payload));
                  } else if (item.placeLocation === '正面文字') {
                    this.setState({
                      chosedFontText: {...item, price:item.prices}
                    });
                    const sendData = item
                    const payload = {
                      functionName: 'renderModel',
                      type: item.placeLocation,
                      data: sendData
                    }
                    this.sendMessage(JSON.stringify(payload));
                  } else if (item.placeLocation === '背面文字') {
                    this.setState({
                      chosedBackText: {...item, price:item.prices}
                    });
                    const sendData = item
                    const payload = {
                      functionName: 'renderModel',
                      type: item.placeLocation,
                      data: sendData
                    }
                    this.sendMessage(JSON.stringify(payload));
                  } else if (item.placeLocation === '台面文字') {
                    this.setState({
                      chosedDesktopText: {...item, price:item.prices}
                    });
                    const sendData = item
                    const payload = {
                      functionName: 'renderModel',
                      type: item.placeLocation,
                      data: sendData
                    }
                    this.sendMessage(JSON.stringify(payload));
                  }
                })
              }
            }
          })
        }
      }
    }

    // 模型页面处理
    if (type !== '套餐') {
      const sendData = flag ? e : {templateUrl:''}
      const payload = {
        functionName: 'renderModel',
        type: type,
        data: sendData
      }
      this.sendMessage(JSON.stringify(payload))
    }
  }


  renderContent = tab =>
  (<div className='commodityList' >    
    <div style={{ width: '100%', height: '100%', overflow: 'auto', overflowX: 'hidden' }}>
    <div style={{width:'calc(100% - 30px)',display:'flex', justifyContent:'space-between', marginLeft:15,paddingRight:20, backgroundColor:'rgba(240,240,240,0.7)', height:'30pt'}}>
      <div style={{width:'40%', height: '30px', lineHeight:'30px', fontSize:'13pt', color:'#D89A81', lineHeight:'30pt', paddingLeft:'10pt'}}>名称</div>
      <div style={{width:'45%', height: '30px', lineHeight:'30px', fontSize:'13pt', color:'#D89A81', lineHeight:'30pt'}}>图片</div>
      <div style={{width:'15%', height: '30px', lineHeight:'30px', fontSize:'13pt', color:'#D89A81', lineHeight:'30pt', textAlign:'right'}}>选择</div>
    </div>
      <List>
        {tab.value.map((e, index) => ((
          <List.Item key={e.id + index}
            extra={<Switch style={{ marginRight: 20}} color="#D89A81" size='small' onChange={(ev) => this.handleSwitchChange(ev, tab.title, e, e.productUrl)}
              checked={
                (tab.title === '墓碑' && (e.id === this.state.chosedMuBei.id || e.id === this.state.chosedMuBei.productId)) ||
                (tab.title === '相框' && (e.id === this.state.chosedPhoto.id || e.id === this.state.chosedPhoto.productId)) ||
                (tab.title === '左侧树' && (e.id === this.state.chosedLeftTree.id || e.id === this.state.chosedLeftTree.productId)) ||
                (tab.title === '右侧树' && (e.id === this.state.chosedRightTree.id || e.id === this.state.chosedRightTree.productId)) ||
                (tab.title === '左侧小品' && (e.id === this.state.chosedLeftItem.id || e.id === this.state.chosedLeftItem.productId)) ||
                (tab.title === '右侧小品' && (e.id === this.state.chosedRightItem.id || e.id === this.state.chosedRightItem.productId)) ||
                (tab.title === '正面文字' && (e.id === this.state.chosedFontText.id || e.id === this.state.chosedFontText.productId)) ||
                (tab.title === '背面文字' && (e.id === this.state.chosedBackText.id || e.id === this.state.chosedBackText.productId)) ||
                (tab.title === '台面文字' && (e.id === this.state.chosedDesktopText.id || e.id === this.state.chosedDesktopText.productId)) ||
                (tab.title === '套餐' && (e.id === this.state.chosedTaoCan.id || e.id === this.state.chosedTaoCan.productId))
              } />}
          >
            <span style={{ display: 'inline-block', width: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</span>
            <img style={{ verticalAlign: 'inherit' }} src={smallOwnersUrl(e.productUrl)}/>            
          </List.Item>
        )))}
      </List>
    </div>
  </div>);





  handleSaveModal = (flag) => {
    this.setState({
      saveModalVisible: flag
    })
    if (!flag) {
      this.setState({
        fangAnName: ''
      })
    }
  }

  handleShowMyDiy = () => {
    if (!this.state.showMyDiy) {
      // 查询我的方案列表
      this.props.fetchMyDiyList()
    }
    this.setState({
      showMyDiy: !this.state.showMyDiy
    });
  }

  // 输入方案名称
  onNameChange = (v) => {
    this.setState({
      fangAnName: v
    })
  }

  // 保存方案
  onSave = () => {
    const {
      chosedMuBei,
      chosedPhoto,
      chosedLeftTree,
      chosedRightTree,
      chosedLeftItem,
      chosedRightItem,
      chosedFontText,
      chosedBackText,
      chosedDesktopText,
      fangAnName,
    } = this.state;
    let payload;
    if (fangAnName === '') {
      Toast.fail('请输入方案名称', 1.3);
    } else if(chosedMuBei.id===''){
      Toast.fail('请选择墓碑', 1.3);
    }else {
      let tempList = [
        {
          "productId": !_.isEmpty(chosedMuBei.id) ? chosedMuBei.id : '',
          "productName": !_.isEmpty(chosedMuBei.name) ? chosedMuBei.name : '',
          "productTypeName": !_.isEmpty(chosedMuBei.productTypeName) ? chosedMuBei.productTypeName : '',
          "productTypeId": !_.isEmpty(chosedMuBei.name) ? chosedMuBei.productTypeId:'',
          "productUrl": !_.isEmpty(chosedMuBei.productUrl) ? chosedMuBei.productUrl : '',
          "templateUrl": !_.isEmpty(chosedMuBei.templateUrl) ? chosedMuBei.templateUrl : '',
          "placeLocation": '墓碑',
          "amount": "1",
          "comboName": "",
          "prices": chosedMuBei.price,
        },
        {
          "productId": !_.isEmpty(chosedPhoto.id) ? chosedPhoto.id : '',
          "productName": !_.isEmpty(chosedPhoto.name) ? chosedPhoto.name : '',
          "productTypeId": !_.isEmpty(chosedPhoto.name) ?chosedPhoto.productTypeId:'',
          "productTypeName": !_.isEmpty(chosedPhoto.productTypeName) ? chosedPhoto.productTypeName : '',
          "productUrl": !_.isEmpty(chosedPhoto.productUrl) ? chosedPhoto.productUrl : '',
          "templateUrl": !_.isEmpty(chosedPhoto.templateUrl) ? chosedPhoto.templateUrl : '',
          "placeLocation": '相框',
          "amount": "1",
          "comboName": "",
          "prices": chosedPhoto.price,
        },
        {
          "productId": !_.isEmpty(chosedLeftTree.id) ? chosedLeftTree.id : '',
          "productName": !_.isEmpty(chosedLeftTree.name) ? chosedLeftTree.name : '',
          "productTypeId":!_.isEmpty(chosedLeftTree.name) ? chosedLeftTree.productTypeId:'',
          "productTypeName": !_.isEmpty(chosedLeftTree.productTypeName) ? chosedLeftTree.productTypeName : '',
          "productUrl": !_.isEmpty(chosedLeftTree.productUrl) ? chosedLeftTree.productUrl : '',
          "templateUrl": !_.isEmpty(chosedLeftTree.templateUrl) ? chosedLeftTree.templateUrl : '',
          "placeLocation": '左侧树',
          "amount": "1",
          "comboName": "",
          "prices": chosedLeftTree.price,
        },
        {
          "productId": !_.isEmpty(chosedRightTree.id) ? chosedRightTree.id : '',
          "productName": !_.isEmpty(chosedRightTree.name) ? chosedRightTree.name : '',
          "productTypeId": !_.isEmpty(chosedRightTree.name) ?chosedRightTree.productTypeId:'',
          "productTypeName": !_.isEmpty(chosedRightTree.productTypeName) ? chosedRightTree.productTypeName : '',
          "productUrl": !_.isEmpty(chosedRightTree.productUrl) ? chosedRightTree.productUrl : '',
          "templateUrl": !_.isEmpty(chosedRightTree.templateUrl) ? chosedRightTree.templateUrl : '',
          "placeLocation": '右侧树',
          "amount": "1",
          "comboName": "",
          "prices": chosedRightTree.price,
        },
        {
          "productId": !_.isEmpty(chosedLeftItem.id) ? chosedLeftItem.id : '',
          "productName": !_.isEmpty(chosedLeftItem.name) ? chosedLeftItem.name : '',
          "productTypeId": !_.isEmpty(chosedLeftItem.name) ? chosedLeftItem.productTypeId:'',
          "productTypeName": !_.isEmpty(chosedLeftItem.productTypeName) ? chosedLeftItem.productTypeName : '',
          "productUrl": !_.isEmpty(chosedLeftItem.productUrl) ? chosedLeftItem.productUrl : '',
          "templateUrl": !_.isEmpty(chosedLeftItem.templateUrl) ? chosedLeftItem.templateUrl : '',
          "placeLocation": '左侧小品',
          "amount": "1",
          "comboName": "",
          "prices": chosedLeftItem.price,
        },
        {
          "productId": !_.isEmpty(chosedRightItem.id) ? chosedRightItem.id : '',
          "productName": !_.isEmpty(chosedRightItem.name) ? chosedRightItem.name : '',
          "productTypeId": !_.isEmpty(chosedRightItem.name) ? chosedRightItem.productTypeId:'',
          "productTypeName": !_.isEmpty(chosedRightItem.productTypeName) ? chosedRightItem.productTypeName : '',
          "productUrl": !_.isEmpty(chosedRightItem.productUrl) ? chosedRightItem.productUrl : '',
          "templateUrl": !_.isEmpty(chosedRightItem.templateUrl) ? chosedRightItem.templateUrl : '',
          "placeLocation": '右侧小品',
          "amount": "1",
          "comboName": "",
          "prices": chosedRightItem.price,
        },
        {
          "productId": !_.isEmpty(chosedFontText.id) ? chosedFontText.id : '',
          "productName": !_.isEmpty(chosedFontText.name) ? chosedFontText.name : '',
          "productTypeId": !_.isEmpty(chosedFontText.name) ? chosedFontText.productTypeId:'',
          "productTypeName": !_.isEmpty(chosedFontText.productTypeName) ? chosedFontText.productTypeName : '',
          "productUrl": !_.isEmpty(chosedFontText.productUrl) ? chosedFontText.productUrl : '',
          "templateUrl": !_.isEmpty(chosedFontText.templateUrl) ? chosedFontText.templateUrl : '',
          "placeLocation": '正面文字',
          "amount": "1",
          "comboName": "",
          "prices": chosedFontText.price,
        },
        {
          "productId": !_.isEmpty(chosedBackText.id) ? chosedBackText.id : '',
          "productName": !_.isEmpty(chosedBackText.name) ? chosedBackText.name : '',
          "productTypeId": !_.isEmpty(chosedBackText.name) ?chosedBackText.productTypeId:'',
          "productTypeName": !_.isEmpty(chosedBackText.productTypeName) ? chosedBackText.productTypeName : '',
          "productUrl": !_.isEmpty(chosedBackText.productUrl) ? chosedBackText.productUrl : '',
          "templateUrl": !_.isEmpty(chosedBackText.templateUrl) ? chosedBackText.templateUrl : '',
          "placeLocation": '背面文字',
          "amount": "1",
          "comboName": "",
          "prices": chosedBackText.price,
        },
        {
          "productId": !_.isEmpty(chosedDesktopText.id) ? chosedDesktopText.id : '',
          "productName": !_.isEmpty(chosedDesktopText.name) ? chosedDesktopText.name : '',
          "productTypeId": !_.isEmpty(chosedDesktopText.id) ?chosedDesktopText.productTypeId:'',
          "productTypeName": !_.isEmpty(chosedDesktopText.productTypeName) ? chosedDesktopText.productTypeName : '',
          "productUrl": !_.isEmpty(chosedDesktopText.productUrl) ? chosedDesktopText.productUrl : '',
          "templateUrl": !_.isEmpty(chosedDesktopText.templateUrl) ? chosedDesktopText.templateUrl : '',
          "placeLocation": '桌面文字',
          "amount": "1",
          "comboName": "",
          "prices": chosedDesktopText.price,
        },
      ];

      const payloadList = tempList.filter(item => item.productId !== '');
      payload = {
        isState: 0,
        personnelId: JSON.parse(sessionStorage.getItem('userid')),
        roleType: 1,
        name: fangAnName,
        comboParticularsInsertDTOS: payloadList
      }

      fetch(smallOwnersUrl('commodity/comboMeal/add'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      }).then(function (response) {
        return response.json();
      }).then((e) => {
        console.log(e)
        // 保存成功, 关闭弹窗
        if (e.flag) {
            this.handleSaveModal(false, '');
            this.props.fetchMyDiyList();
            this.handleMyDiyOkModal(true);
        } else {
          Toast.fail('保存失败',1.3);
        }
      })
    }
  }

  // 删除diy弹窗
  handleDeleteDiy = (flag, record) => {
    this.setState({
      deleteDitModalVisible: flag,
      willDeleteMyDiy: record
    })
  }

  // 删除diy提交
  onDeleteDiy = () => {
    this.props.deleteMyDiy(this.state.willDeleteMyDiy);
    this.handleDeleteDiy(false, {});
    setTimeout(() => {
      this.props.fetchMyDiyList();
    }, 500);
  }

  // 客服开关
  handleServices = () => {
    this.setState({
      showServices: !this.state.showServices
    });
  }

  // 加载DIY方案
  useDiy=(record)=>{
    // 先清除所有模型
    const payload = {
      functionName: 'renderModel',
      type: 'clearAll',
    }
    this.sendMessage(JSON.stringify(payload))
    this.setState({
      chosedMuBei: { id: '' }, // 选择的墓碑
      chosedPhoto: { id: '' }, // 选择的相框
      chosedLeftTree: { id: '' }, // 左侧树
      chosedRightTree: { id: '' }, // 左侧树
      chosedLeftItem: { id: '' }, // 左前小品
      chosedRightItem: { id: '' }, // 右前小品
      chosedFontText: { id: '' },  // 正面文字
      chosedBackText: { id: '' },  // 背面文字
      chosedDesktopText: { id: '' },  // 背面文字
    })
    // 请求某套餐下的所有产品
    fetch(smallOwnersUrl(`commodity/comboMeal/get/${record.id}`), {
      method: 'GET',
    }).then(function (response) {
      return response.json();
    }).then((e) => {
      const listData = e.data.comboParticularsVOS;
      if (e.flag) {
        if(!_.isEmpty(listData)) {
          listData.map(item => {
            // console.log(item)
            if (item.placeLocation === '墓碑') {
              // console.log('套餐墓碑');
                    // console.log(item);
              this.setState({
                chosedMuBei: item
              });
              const sendData = item
              const payload = {
                functionName: 'renderModel',
                type: item.placeLocation,
                data: sendData
              }
              this.sendMessage(JSON.stringify(payload));
            } else if (item.placeLocation === '相框') {
              this.setState({
                chosedPhoto: item
              });
              const sendData = item
              const payload = {
                functionName: 'renderModel',
                type: item.placeLocation,
                data: sendData
              }
              this.sendMessage(JSON.stringify(payload));
            } else if (item.placeLocation === '左侧树') {
              this.setState({
                chosedLeftTree: item
              });
              const sendData = item
              const payload = {
                functionName: 'renderModel',
                type: item.placeLocation,
                data: sendData
              }
              this.sendMessage(JSON.stringify(payload));
            } else if (item.placeLocation === '右侧树') {
              this.setState({
                chosedRightTree: item
              });
              const sendData = item
              const payload = {
                functionName: 'renderModel',
                type: item.placeLocation,
                data: sendData
              }
              this.sendMessage(JSON.stringify(payload));
            } else if (item.placeLocation === '左侧小品') {
              this.setState({
                chosedLeftItem: item
              });
              const sendData = item
              const payload = {
                functionName: 'renderModel',
                type: item.placeLocation,
                data: sendData
              }
              this.sendMessage(JSON.stringify(payload));
            } else if (item.placeLocation === '右侧小品') {
              this.setState({
                chosedRightItem: item
              });
              const sendData = item
              const payload = {
                functionName: 'renderModel',
                type: item.placeLocation,
                data: sendData
              }
              this.sendMessage(JSON.stringify(payload));
            } else if (item.placeLocation === '正面文字') {
              this.setState({
                chosedFontText: item
              });
              const sendData = item
              const payload = {
                functionName: 'renderModel',
                type: item.placeLocation,
                data: sendData
              }
              this.sendMessage(JSON.stringify(payload));
            } else if (item.placeLocation === '背面文字') {
              this.setState({
                chosedBackText: item
              });
              const sendData = item
              const payload = {
                functionName: 'renderModel',
                type: item.placeLocation,
                data: sendData
              }
              this.sendMessage(JSON.stringify(payload));
            } else if (item.placeLocation === '台面文字') {
              this.setState({
                chosedDesktopText: item
              });
              const sendData = item
              const payload = {
                functionName: 'renderModel',
                type: item.placeLocation,
                data: sendData
              }
              this.sendMessage(JSON.stringify(payload));
            }
          })
        }
      }
    })
    this.handleShowMyDiy();
  }

  // 预约看墓弹窗
  handleYuYue=(flag)=>{
    this.setState({
      yuYueModalVisible:flag
    });
    if(!flag){
      // 清空
      this.setState({
        yuYueName:'', // 预约看墓用户名
        mobilePhone:'',  // 用户电话
        xiaoShouName:'', // 销售名字
        xiaoShouPhone:'', // 销售电话
        yuYueTime:'', // 预约时间
        personNum:'', // 同行人数 
      })
    }
  }

  // 填写预约弹窗数据
  onYuYueChange=(key,value)=>{
    this.setState({
      [key]:value
    })
  }
  // 选择预约时间
  testChangeTime=(date)=>{
    this.setState({
      yuYueTime:date
    })
  }

  // 预约看墓提交
  onYuYue=()=>{
    const { 
      yuYueName,
      mobilePhone,
      xiaoShouName,
      xiaoShouPhone,
      yuYueTime,
      personNum,
      code
    } = this.state;
    // 请求接口
    const payload = {
      "personnelId": !_.isEmpty(sessionStorage.getItem('userid'))?JSON.parse(sessionStorage.getItem('userid')):'',
      "personnelName": yuYueName,
      "personnelPhone": mobilePhone,
      "startTime": moment(yuYueTime).format('YYYY-MM-DD HH:mm:ss'),
      "travelPartner": personNum,
      "code":code
    }

    // 提交预约信息
    fetch(smallOwnersUrl('/booked/booked/add'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }).then(function (response) {
      return response.json();
    }).then((e) => {
      console.log(e)
      if (e.flag) {
          Toast.success('预约成功',1.3)          
          this.handleYuYue(false)
      } else {
        Toast.fail('预约失败',1.3);
      }
    })
    
    
  }

  // diy提交成功确认弹窗提示
  handleMyDiyOkModal=(flag)=>{
    this.setState({
      myDiyOkVisible: flag
    })
  }

  // 点击商品tabs回调
  onTabsClick=(e,index)=>{
    this.setState({
      tabsPage: index
    })
  }


  render() {
    const { showItemsTabs, showMyDiy, itemTabs, myDiyList, yuYueModalVisible, myDiyOkVisible } = this.state;
    return (
      <div className='diymuxueindexconten'>
        { (this.props.user.redirectT==='' || this.props.user.redirectTo==='/login')? <Redirect to='./login' />:null}
        <Head title='自定义方案' handleBack={this.handleBack} />
        {/* <div
          style={{ color: '#fff', position: 'absolute', top: '36px', left: '12px' }}
          onClick={() => this.handlePush('/index')}
        >
          <Icon type='left' style={{ color: '#fff' }} size='lg' />
        </div> */}
        <div style={{ width: '100vw', height: '100vh', zIndex: 1 }}>
          <iframe
            id='iframe3D_MuBei'
            width="100%"
            height='100%'
            // className={this.state.lookheight}
            src='http://graveguide.zhizunyuan.com:18002'
            // src='http://192.168.10.88:18002'
            // src='http://localhost:8005/muBeiDIY/index.html'
            // src='http://192.168.10.198:8005/muBeiDIY/index.html'
            
            frameBorder="no" border="0" scrolling="no"
            allowtransparency="yes"
            sandbox="allow-scripts allow-forms allow-same-origin"
          />
        </div>
        {/* <div onClick={this.handleItemTabs} style={{ position: 'absolute', top: '90px', right: '20px'  , textAlign: 'center', borderRadius: '50%' }}>
          
          <img src={myDiyImg} style={{ width: "35px", height: "35px", margin:'10px 0' }}></img>
          <div style={{color:'#fff', textShadow:'0 0 5px #000', lineHeight:'0px'}}>物品列表</div>
        </div> */}
        {showItemsTabs ? <div style={{ width: '100%', height: '40vh', zIndex: 100, position: 'absolute', bottom: 72}} >
      <img src={xila} width='50px' height='50px' style={{position:'absolute', width:'50px', height:'50px', top:'-40px', left:'calc(50% - 25px)', filter:'drop-shadow(0 0 2px #000)'}} onClick={this.handleItemTabs} />

          <Tabs onTabClick={this.onTabsClick} page={this.state.tabsPage} tabs={itemTabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />} style={{ height: '50vh' }}>
            {this.renderContent}
          </Tabs>
        </div> : null}

        <div style={{ width: '100%', height: 'calc(100vh - 72px)', zIndex: 100, position: 'absolute', top: 0, overflow: 'auto', overflowX: 'hidden', display: showMyDiy ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className='myDiyBox' ref={this.taskWrapper}>
            <div>
              {!_.isEmpty(myDiyList) ? myDiyList.map((item) => (
                <div className='myDiyBoxItem' style={{ display:'flex', justifyContent:'space-between'}} key={item.id}>
                  <div style={{width:'60%'}}>
                    <div className='myDiyBoxItemTitle'>{item.name}</div>
                    <div className='myDiyBoxItemTime'>于{item.createTime}创建</div>
                    <div style={{ height: 30, lineHeight:'30px', fontSize:'13pt', color:'#D89A81'}} onClick={() => this.handleDeleteDiy(true, item)}>删除</div>
                  </div>
                  <div style={{ height: '30px', width:'40%'}}>
                    <div className='btnPrimary' style={{ width: '100%', marginTop:'25%'}} onClick={()=>this.useDiy(item)}>去查看</div>
                  </div>
                  
                  {/* <div className='myDiyBoxItemListBox' style={{display:'none'}}>
                    {!_.isEmpty(item.comboParticularsVOS) ?
                      item.comboParticularsVOS.map(e => (
                        <div className='myDiyBoxItemListItem'>
                          <span className='myDiyBoxItemListItemText'>{e.typeName}</span>
                          <span className='myDiyBoxItemListItemText'>{e.name}</span>
                        </div>
                      )) : null
                    }
                  </div> */}
                  
                </div>
              )) : <div className='myDiyBoxItem' style={{ height: '10vh', lineHeight: '10vh', textAlign: 'center', color: '#aaa', fontSize: '18px', fontWeight: 600 }}>暂无自定义方案</div>}

            </div>
          </div>
        </div>

        


        {/* <script>
          {
            (function () {
              // /wspush?xsId=1&type=0&name=王忠宾&iphone=19123456852
              
              socket.onopen = function (event) {
                console.log("客户1建立连接........")
                // 监听消息
                socket.onmessage = function (event) {
                  // console.log('Client received a message',event);
                  var ifr = document.getElementById("iframe3D_KeFuIframe");
                  console.log(ifr);
                  console.log(event);
                  console.log(event.data);
                  ifr.src = event.data;
                };
                // 监听Socket的关闭
                socket.onclose = function (event) {
                  console.log('Client notified socket has closed', event);
                };
                // 关闭Socket.... 
                //socket.close()
              }
            })()
          }
        </script> */}
        <div className={this.state.topjudge ? "dropdowns" : "dropdownsa"} style={{ display: this.state.showServices ? 'block' : 'none' }}>
          <div className='textpone'>
            {this.state.topjudge ? <div onClick={() => this.dowdasd("top")}>
              <img className='imgShadow' src={xila} />
            </div> : <div onClick={() => this.dowdasd('bottom')}>
              <img className='imgShadow' src={shangla} />
            </div>}
            {/* <div>
              <a href="tel:18503853147"><img src={phone} /></a>
            </div> */}
          </div>
          <div style={{width:'100vw', height:'calc(100% - 100px)'}}>
            <iframe
              className='customerservice'
              id='iframe3D_KeFuIframe'
              width="100%"
              height="100%"
              // className={this.state.lookheight}
              src='https://p.qiao.baidu.com/cps/chat?siteId=12341222&userId=1343203&siteToken=b7ef1ec41a7409c3f078f89819d75dd5'
              frameBorder="no" border="0" scrolling="no"
              allowtransparency="yes"
              sandbox="allow-scripts allow-forms allow-same-origin"
            />
          </div>
        </div>
        {this.state.saveModalVisible ?
          <Modal
            maskClosable
            transparent
            closable
            visible={true}
            onClose={() => this.handleSaveModal(false, {})}
            title='保存当前方案'
            footer={[
              { text: '关闭', onPress: () => this.handleSaveModal(false, {}) },
              { text: '保存', onPress: () => { this.onSave() } },
            ]}
          >
            <div style={{ height: '100px', textAlign: 'left', marginTop: 20 }}>
              <InputItem
                onChange={(e) => this.onNameChange(e)}
                clear
                placeholder="请输入方案名称"
              >方案名称</InputItem>
            </div>
          </Modal> : null
        }

        <div style={{
          display:myDiyOkVisible?'block':'none', zIndex:100, width:'100vw', height:'100vh', backgroundColor:'rgba(0,0,0,0.5)', 
          position:'absolute',top:0,left:0
        }}>
          <div style={{
              position:'absolute', top: '36vh', left: '20vw', width:'calc(60vw - 40px)', 
              backgroundColor:'#fff', borderRadius:'6px', padding:'10px 20px'
          }}>
            <div style={{ textAlign:'center', fontSize:'11pt', lineHeight:'7vw', marginTop: '20px'}} >
              您的自定义墓地方案<br/>已保存在"我的方案"中<br/>了解详情请联系客服
            </div>
            <div onClick={()=>this.handleMyDiyOkModal(false)} style={{ margin:'20px 0', width:'40vw', height:'10vw', backgroundColor:'rgb(216,154,129)', marginLeft:'5vw', textAlign:'center', fontSize:'13pt', lineHeight:'10vw', color:'#fff', borderRadius:'4px'}}>确认</div>
          </div>
        </div>

        {yuYueModalVisible ?
          <Modal
            maskClosable
            transparent
            closable
            visible={true}
            onClose={() => this.handleYuYue(false)}
            title='预约看墓'
            bodyStyle={{height:'40vh'}}
            footer={[
              { text: '取消', onPress: () => this.handleYuYue(false) },
              { text: '提交', onPress: () => { this.onYuYue() } },
            ]}
          >
            <div className='yuYueModalStyle' style={{ height: '100px', textAlign: 'left', marginTop: 20 }}>
              
              <InputItem
                onChange={(e) => this.onYuYueChange('mobilePhone',e)}
                // value={JSON.parse(sessionStorage.getItem('phone'))}
                placeholder="请输入手机号码"
                // disabled
              >
                联系方式
              </InputItem>
              <InputItem type='text' placeholder='请输入验证码' className='input'
                    onChange={e => { this.onYuYueChange('code',e)}}
                    extra={<Code phone="form.userName" field={this.state} stateField={this.state} type="default"></Code>}>
                  </InputItem>
              <InputItem
                onChange={(e) => this.onYuYueChange('yuYueName',e)}
                clear
                placeholder="请输入您的姓名"
              >
                姓名
              </InputItem>
              {/* <InputItem
                onChange={(e) => this.onYuYueChange('xiaoShouName',e)}
                clear
                placeholder="请输入销售姓名"
              >
                销售姓名
              </InputItem>
              <InputItem
                onChange={(e) => this.onYuYueChange('xiaoShouPhone',e)}
                clear
                type='phone'
                placeholder="请输入销售电话"
              >
                销售电话
              </InputItem> */}
              <DatePicker
                value={this.state.yuYueTime}
                minuteStep = {30}
                onChange={startTime =>  this.testChangeTime(startTime)}
              >
                <List.Item arrow="horizontal">预约时间</List.Item>
              </DatePicker>
              
              <InputItem
                onChange={(e) => this.onYuYueChange('xiaoShouPhone',e)}
                clear
                type='number'
                placeholder="请输入同行人数"
              >
                同行人数
              </InputItem>
            </div>
          </Modal> : null
        }

        {this.state.deleteDitModalVisible ?
          <Modal
            maskClosable
            transparent
            closable
            visible={true}
            onClose={() => this.handleSaveModal(false, {})}
            title='删除方案'
            footer={[
              { text: '关闭', onPress: () => this.handleDeleteDiy(false, {}) },
              { text: '删除', onPress: () => { this.onDeleteDiy() } },
            ]}
          >
            <div style={{ height: '100px', textAlign: 'center', marginTop: 20 }}>
              是否删除自定义方案<br />{this.state.willDeleteMyDiy.name}
            </div>
          </Modal> : null
        }
        

        {/* <div className='phoneIcon'>
          <a href="tel:11111111111">
            <img src={phoneIcon} alt = '' />
          </a>
        </div> */}

        <div className='diymuxueindex' >
          <div onClick={() => this.handlePush('/Diyinformation')}>
            <img src={keFuIcon} style={{ width: "35px", height: "35px", margin:'0 0 4px 0' }}></img>
            <div style={{ color: ' #fff' }}>完善信息</div>
          </div>
          <div onClick={this.handleItemTabs} >
            <img src={chanPinIcon} style={{ width: "35px", height: "35px", margin:'0 0 4px 0' }}></img>
            <div style={{ color: ' #fff' }}>产品列表</div>
          </div>
          <div onClick={() => this.handleShowMyDiy(true)} >
            <img src={fangAnIcon} style={{ width: "35px", height: "35px", margin:'0 0 4px 0' }}></img>
            <div style={{ color: ' #fff' }}>我的方案</div>
          </div>
          {/* <div onClick={() => this.handleYuYue(true)} >
            <img src={myDiyImg} style={{ width: "35px", height: "35px", margin:'0 0 4px 0' }}></img>
            <div style={{ color: ' #fff' }}>预约看墓</div>
          </div> */}
          <div onClick={() => this.handleSaveModal(true, {})} >
            <img src={baoCunIcon} style={{ width: "35px", height: "35px", margin:'0 0 4px 0' }}></img>
            <div style={{ color: ' #fff' }}>保存</div>
          </div>
        </div>
      </div>
    );
  }
}

export default diymuxue;
