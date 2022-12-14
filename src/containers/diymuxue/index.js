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
      saveModalVisible: false,  // ????????????
      showServices: false,  // ????????????
      yuYueModalVisible: false, // ??????????????????
      myDiyOkVisible:false, // diy??????????????????????????????
      chosedMuBei: { id: '' }, // ???????????????
      chosedPhoto: { id: '' }, // ???????????????
      chosedLeftTree: { id: '' }, // ?????????
      chosedRightTree: { id: '' }, // ?????????
      chosedLeftItem: { id: '' }, // ????????????
      chosedRightItem: { id: '' }, // ????????????
      chosedFontText: { id: '' },  // ????????????
      chosedBackText: { id: '' },  // ????????????
      chosedDesktopText: { id: '' },  // ????????????
      chosedTaoCan: { id: '' },  // ??????
      useTaoCan: false, // ????????????????????????
      tabsPage:0,   // ??????tabs??????


      fangAnName: '',  // ????????????

      willDeleteMyDiy: {}, // ?????????????????????
      socketConnected: false, // ?????????

      itemTabs: [
        { title: '??????', value: [] },
        { title: '??????', value: [] },
        { title: '??????', value: [] },
        { title: '?????????', value: [] },
        { title: '?????????', value: [] },
        { title: '????????????', value: [] },
        { title: '????????????', value: [] },
        { title: '????????????', value: [] },
        { title: '????????????', value: [] },
        { title: '????????????', value: [] },
      ],  // ????????????
      myDiyList: [],
      yuYueName:'', // ?????????????????????
      mobilePhone:'',  // ????????????
      xiaoShouName:'', // ????????????
      xiaoShouPhone:'', // ????????????
      yuYueTime:'', // ????????????
      personNum:'', // ????????????
      code: '',     // ?????????
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
    //     console.log('????????????')
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
      if (e.title === '??????') {
        itemTabs[index].value = this.props.diyMuBei.muBeiList
      } else if (e.title === '??????') {
        itemTabs[index].value = this.props.diyMuBei.photoList
      } else if (e.title === '?????????') {
        itemTabs[index].value = this.props.diyMuBei.treeList
      } else if (e.title === '?????????') {
        itemTabs[index].value = this.props.diyMuBei.treeList
      } else if (e.title === '????????????') {
        itemTabs[index].value = this.props.diyMuBei.itemsList
      } else if (e.title === '????????????') {
        itemTabs[index].value = this.props.diyMuBei.itemsList
      } else if (e.title === '????????????') {
        itemTabs[index].value = this.props.diyMuBei.textList
      } else if (e.title === '????????????') {
        itemTabs[index].value = this.props.diyMuBei.textList
      } else if (e.title === '????????????') {
        itemTabs[index].value = this.props.diyMuBei.textList
      } else if (e.title === '??????') {
        itemTabs[index].value = this.props.diyMuBei.taoCanList
      }
    })

    this.initScroll();
    // ??????????????????????????????
    this.props.fetchProductList(
      { typeName: '??????' }
    );
    this.props.fetchProductList(
      { typeName: '??????' }
    );
    this.props.fetchProductList(
      { typeName: '??????' }
    );
    this.props.fetchProductList(
      { typeName: '??????' }
    );
    this.props.fetchProductList(
      { typeName: '??????' }
    );
    // ????????????
    this.props.fetchTaoCanList({ typeName: '??????' })
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
      if (e.title === '??????') {
        itemTabs[index].value = nextProps.diyMuBei.muBeiList
      } else if (e.title === '??????') {
        itemTabs[index].value = nextProps.diyMuBei.photoList
      } else if (e.title === '?????????') {
        itemTabs[index].value = nextProps.diyMuBei.treeList
      } else if (e.title === '?????????') {
        itemTabs[index].value = nextProps.diyMuBei.treeList
      } else if (e.title === '????????????') {
        itemTabs[index].value = nextProps.diyMuBei.itemsList
      } else if (e.title === '????????????') {
        itemTabs[index].value = nextProps.diyMuBei.itemsList
      } else if (e.title === '????????????') {
        itemTabs[index].value = nextProps.diyMuBei.textList
      } else if (e.title === '????????????') {
        itemTabs[index].value = nextProps.diyMuBei.textList
      } else if (e.title === '????????????') {
        itemTabs[index].value = nextProps.diyMuBei.textList
      } else if (e.title === '??????') {
        itemTabs[index].value = nextProps.diyMuBei.taoCanList
      }
    })
    this.setState({
      myDiyList: nextProps.diyMuBei.myDiyList
    })
    // console.log('nextProps---------???????????????')
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

  // ????????????????????????
  handleItemTabs = () => {
    this.setState({
      showItemsTabs: !this.state.showItemsTabs
    })
    if (!this.state.showItemsTabs) {
      // ??????????????????
    }
  }

  // ????????????????????????
  sendMessage = (value) => {
    // console.log(value)
    // if (value) {
    const childFrame = document.getElementById('iframe3D_MuBei');
    childFrame.contentWindow.postMessage(value, '*');
    // }
  }

  // ?????????????????????
  handleSwitchChange = (flag, type, e) => {
    if (!flag) {
      this.setState({
        useTaoCan: false
      })
      if (type === '??????') {
        this.setState({
          chosedMuBei: { id: '' }
        })
      } else if (type === '??????') {
        this.setState({
          chosedPhoto: { id: '' }
        })
      } else if (type === '?????????') {
        this.setState({
          chosedLeftTree: { id: '' }
        })
      } else if (type === '?????????') {
        this.setState({
          chosedRightTree: { id: '' }
        })
      } else if (type === '????????????') {
        this.setState({
          chosedLeftItem: { id: '' }
        })
      } else if (type === '????????????') {
        this.setState({
          chosedRightItem: { id: '' }
        })
      } else if (type === '????????????') {
        this.setState({
          chosedFontText: { id: '' }
        })
      } else if (type === '????????????') {
        this.setState({
          chosedBackText: { id: '' }
        })
      } else if (type === '????????????') {
        this.setState({
          chosedDesktopText: { id: '' }
        })
      } else if (type === '??????') {
        this.setState({
          chosedTaoCan: { id: '' }
        })
      }
    } else {
      {
        if (type === '??????') {
          this.setState({
            chosedMuBei: e
          })
        } else if (type === '??????') {
          this.setState({
            chosedPhoto: e
          })
        } else if (type === '?????????') {
          this.setState({
            chosedLeftTree: e
          })
        } else if (type === '?????????') {
          this.setState({
            chosedRightTree: e
          })
        } else if (type === '????????????') {
          this.setState({
            chosedLeftItem: e
          })
        } else if (type === '????????????') {
          this.setState({
            chosedRightItem: e
          })
        } else if (type === '????????????') {
          this.setState({
            chosedFontText: e
          })
        } else if (type === '????????????') {
          this.setState({
            chosedBackText: e
          })
        } else if (type === '????????????') {
          this.setState({
            chosedDesktopText: e
          })
        } else if (type === '??????') {
          this.setState({
            chosedTaoCan: e
          });
          // ?????????????????????
          const payload = {
            functionName: 'renderModel',
            type: 'clearAll',
          }
          this.sendMessage(JSON.stringify(payload));
          this.setState({
            chosedMuBei: { id: '' }, // ???????????????
            chosedPhoto: { id: '' }, // ???????????????
            chosedLeftTree: { id: '' }, // ?????????
            chosedRightTree: { id: '' }, // ?????????
            chosedLeftItem: { id: '' }, // ????????????
            chosedRightItem: { id: '' }, // ????????????
            chosedFontText: { id: '' },  // ????????????
            chosedBackText: { id: '' },  // ????????????
            chosedDesktopText: { id: '' },  // ????????????
          })
          // ?????????????????????????????????
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
                  if (item.placeLocation === '??????') {
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
                  } else if (item.placeLocation === '??????') {
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
                  } else if (item.placeLocation === '?????????') {
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
                  } else if (item.placeLocation === '?????????') {
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
                  } else if (item.placeLocation === '????????????') {
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
                  } else if (item.placeLocation === '????????????') {
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
                  } else if (item.placeLocation === '????????????') {
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
                  } else if (item.placeLocation === '????????????') {
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
                  } else if (item.placeLocation === '????????????') {
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

    // ??????????????????
    if (type !== '??????') {
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
      <div style={{width:'40%', height: '30px', lineHeight:'30px', fontSize:'13pt', color:'#D89A81', lineHeight:'30pt', paddingLeft:'10pt'}}>??????</div>
      <div style={{width:'45%', height: '30px', lineHeight:'30px', fontSize:'13pt', color:'#D89A81', lineHeight:'30pt'}}>??????</div>
      <div style={{width:'15%', height: '30px', lineHeight:'30px', fontSize:'13pt', color:'#D89A81', lineHeight:'30pt', textAlign:'right'}}>??????</div>
    </div>
      <List>
        {tab.value.map((e, index) => ((
          <List.Item key={e.id + index}
            extra={<Switch style={{ marginRight: 20}} color="#D89A81" size='small' onChange={(ev) => this.handleSwitchChange(ev, tab.title, e, e.productUrl)}
              checked={
                (tab.title === '??????' && (e.id === this.state.chosedMuBei.id || e.id === this.state.chosedMuBei.productId)) ||
                (tab.title === '??????' && (e.id === this.state.chosedPhoto.id || e.id === this.state.chosedPhoto.productId)) ||
                (tab.title === '?????????' && (e.id === this.state.chosedLeftTree.id || e.id === this.state.chosedLeftTree.productId)) ||
                (tab.title === '?????????' && (e.id === this.state.chosedRightTree.id || e.id === this.state.chosedRightTree.productId)) ||
                (tab.title === '????????????' && (e.id === this.state.chosedLeftItem.id || e.id === this.state.chosedLeftItem.productId)) ||
                (tab.title === '????????????' && (e.id === this.state.chosedRightItem.id || e.id === this.state.chosedRightItem.productId)) ||
                (tab.title === '????????????' && (e.id === this.state.chosedFontText.id || e.id === this.state.chosedFontText.productId)) ||
                (tab.title === '????????????' && (e.id === this.state.chosedBackText.id || e.id === this.state.chosedBackText.productId)) ||
                (tab.title === '????????????' && (e.id === this.state.chosedDesktopText.id || e.id === this.state.chosedDesktopText.productId)) ||
                (tab.title === '??????' && (e.id === this.state.chosedTaoCan.id || e.id === this.state.chosedTaoCan.productId))
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
      // ????????????????????????
      this.props.fetchMyDiyList()
    }
    this.setState({
      showMyDiy: !this.state.showMyDiy
    });
  }

  // ??????????????????
  onNameChange = (v) => {
    this.setState({
      fangAnName: v
    })
  }

  // ????????????
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
      Toast.fail('?????????????????????', 1.3);
    } else if(chosedMuBei.id===''){
      Toast.fail('???????????????', 1.3);
    }else {
      let tempList = [
        {
          "productId": !_.isEmpty(chosedMuBei.id) ? chosedMuBei.id : '',
          "productName": !_.isEmpty(chosedMuBei.name) ? chosedMuBei.name : '',
          "productTypeName": !_.isEmpty(chosedMuBei.productTypeName) ? chosedMuBei.productTypeName : '',
          "productTypeId": !_.isEmpty(chosedMuBei.name) ? chosedMuBei.productTypeId:'',
          "productUrl": !_.isEmpty(chosedMuBei.productUrl) ? chosedMuBei.productUrl : '',
          "templateUrl": !_.isEmpty(chosedMuBei.templateUrl) ? chosedMuBei.templateUrl : '',
          "placeLocation": '??????',
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
          "placeLocation": '??????',
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
          "placeLocation": '?????????',
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
          "placeLocation": '?????????',
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
          "placeLocation": '????????????',
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
          "placeLocation": '????????????',
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
          "placeLocation": '????????????',
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
          "placeLocation": '????????????',
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
          "placeLocation": '????????????',
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
        // ????????????, ????????????
        if (e.flag) {
            this.handleSaveModal(false, '');
            this.props.fetchMyDiyList();
            this.handleMyDiyOkModal(true);
        } else {
          Toast.fail('????????????',1.3);
        }
      })
    }
  }

  // ??????diy??????
  handleDeleteDiy = (flag, record) => {
    this.setState({
      deleteDitModalVisible: flag,
      willDeleteMyDiy: record
    })
  }

  // ??????diy??????
  onDeleteDiy = () => {
    this.props.deleteMyDiy(this.state.willDeleteMyDiy);
    this.handleDeleteDiy(false, {});
    setTimeout(() => {
      this.props.fetchMyDiyList();
    }, 500);
  }

  // ????????????
  handleServices = () => {
    this.setState({
      showServices: !this.state.showServices
    });
  }

  // ??????DIY??????
  useDiy=(record)=>{
    // ?????????????????????
    const payload = {
      functionName: 'renderModel',
      type: 'clearAll',
    }
    this.sendMessage(JSON.stringify(payload))
    this.setState({
      chosedMuBei: { id: '' }, // ???????????????
      chosedPhoto: { id: '' }, // ???????????????
      chosedLeftTree: { id: '' }, // ?????????
      chosedRightTree: { id: '' }, // ?????????
      chosedLeftItem: { id: '' }, // ????????????
      chosedRightItem: { id: '' }, // ????????????
      chosedFontText: { id: '' },  // ????????????
      chosedBackText: { id: '' },  // ????????????
      chosedDesktopText: { id: '' },  // ????????????
    })
    // ?????????????????????????????????
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
            if (item.placeLocation === '??????') {
              // console.log('????????????');
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
            } else if (item.placeLocation === '??????') {
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
            } else if (item.placeLocation === '?????????') {
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
            } else if (item.placeLocation === '?????????') {
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
            } else if (item.placeLocation === '????????????') {
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
            } else if (item.placeLocation === '????????????') {
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
            } else if (item.placeLocation === '????????????') {
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
            } else if (item.placeLocation === '????????????') {
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
            } else if (item.placeLocation === '????????????') {
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

  // ??????????????????
  handleYuYue=(flag)=>{
    this.setState({
      yuYueModalVisible:flag
    });
    if(!flag){
      // ??????
      this.setState({
        yuYueName:'', // ?????????????????????
        mobilePhone:'',  // ????????????
        xiaoShouName:'', // ????????????
        xiaoShouPhone:'', // ????????????
        yuYueTime:'', // ????????????
        personNum:'', // ???????????? 
      })
    }
  }

  // ????????????????????????
  onYuYueChange=(key,value)=>{
    this.setState({
      [key]:value
    })
  }
  // ??????????????????
  testChangeTime=(date)=>{
    this.setState({
      yuYueTime:date
    })
  }

  // ??????????????????
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
    // ????????????
    const payload = {
      "personnelId": !_.isEmpty(sessionStorage.getItem('userid'))?JSON.parse(sessionStorage.getItem('userid')):'',
      "personnelName": yuYueName,
      "personnelPhone": mobilePhone,
      "startTime": moment(yuYueTime).format('YYYY-MM-DD HH:mm:ss'),
      "travelPartner": personNum,
      "code":code
    }

    // ??????????????????
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
          Toast.success('????????????',1.3)          
          this.handleYuYue(false)
      } else {
        Toast.fail('????????????',1.3);
      }
    })
    
    
  }

  // diy??????????????????????????????
  handleMyDiyOkModal=(flag)=>{
    this.setState({
      myDiyOkVisible: flag
    })
  }

  // ????????????tabs??????
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
        <Head title='???????????????' handleBack={this.handleBack} />
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
          <div style={{color:'#fff', textShadow:'0 0 5px #000', lineHeight:'0px'}}>????????????</div>
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
                    <div className='myDiyBoxItemTime'>???{item.createTime}??????</div>
                    <div style={{ height: 30, lineHeight:'30px', fontSize:'13pt', color:'#D89A81'}} onClick={() => this.handleDeleteDiy(true, item)}>??????</div>
                  </div>
                  <div style={{ height: '30px', width:'40%'}}>
                    <div className='btnPrimary' style={{ width: '100%', marginTop:'25%'}} onClick={()=>this.useDiy(item)}>?????????</div>
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
              )) : <div className='myDiyBoxItem' style={{ height: '10vh', lineHeight: '10vh', textAlign: 'center', color: '#aaa', fontSize: '18px', fontWeight: 600 }}>?????????????????????</div>}

            </div>
          </div>
        </div>

        


        {/* <script>
          {
            (function () {
              // /wspush?xsId=1&type=0&name=?????????&iphone=19123456852
              
              socket.onopen = function (event) {
                console.log("??????1????????????........")
                // ????????????
                socket.onmessage = function (event) {
                  // console.log('Client received a message',event);
                  var ifr = document.getElementById("iframe3D_KeFuIframe");
                  console.log(ifr);
                  console.log(event);
                  console.log(event.data);
                  ifr.src = event.data;
                };
                // ??????Socket?????????
                socket.onclose = function (event) {
                  console.log('Client notified socket has closed', event);
                };
                // ??????Socket.... 
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
            title='??????????????????'
            footer={[
              { text: '??????', onPress: () => this.handleSaveModal(false, {}) },
              { text: '??????', onPress: () => { this.onSave() } },
            ]}
          >
            <div style={{ height: '100px', textAlign: 'left', marginTop: 20 }}>
              <InputItem
                onChange={(e) => this.onNameChange(e)}
                clear
                placeholder="?????????????????????"
              >????????????</InputItem>
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
              ???????????????????????????<br/>????????????"????????????"???<br/>???????????????????????????
            </div>
            <div onClick={()=>this.handleMyDiyOkModal(false)} style={{ margin:'20px 0', width:'40vw', height:'10vw', backgroundColor:'rgb(216,154,129)', marginLeft:'5vw', textAlign:'center', fontSize:'13pt', lineHeight:'10vw', color:'#fff', borderRadius:'4px'}}>??????</div>
          </div>
        </div>

        {yuYueModalVisible ?
          <Modal
            maskClosable
            transparent
            closable
            visible={true}
            onClose={() => this.handleYuYue(false)}
            title='????????????'
            bodyStyle={{height:'40vh'}}
            footer={[
              { text: '??????', onPress: () => this.handleYuYue(false) },
              { text: '??????', onPress: () => { this.onYuYue() } },
            ]}
          >
            <div className='yuYueModalStyle' style={{ height: '100px', textAlign: 'left', marginTop: 20 }}>
              
              <InputItem
                onChange={(e) => this.onYuYueChange('mobilePhone',e)}
                // value={JSON.parse(sessionStorage.getItem('phone'))}
                placeholder="?????????????????????"
                // disabled
              >
                ????????????
              </InputItem>
              <InputItem type='text' placeholder='??????????????????' className='input'
                    onChange={e => { this.onYuYueChange('code',e)}}
                    extra={<Code phone="form.userName" field={this.state} stateField={this.state} type="default"></Code>}>
                  </InputItem>
              <InputItem
                onChange={(e) => this.onYuYueChange('yuYueName',e)}
                clear
                placeholder="?????????????????????"
              >
                ??????
              </InputItem>
              {/* <InputItem
                onChange={(e) => this.onYuYueChange('xiaoShouName',e)}
                clear
                placeholder="?????????????????????"
              >
                ????????????
              </InputItem>
              <InputItem
                onChange={(e) => this.onYuYueChange('xiaoShouPhone',e)}
                clear
                type='phone'
                placeholder="?????????????????????"
              >
                ????????????
              </InputItem> */}
              <DatePicker
                value={this.state.yuYueTime}
                minuteStep = {30}
                onChange={startTime =>  this.testChangeTime(startTime)}
              >
                <List.Item arrow="horizontal">????????????</List.Item>
              </DatePicker>
              
              <InputItem
                onChange={(e) => this.onYuYueChange('xiaoShouPhone',e)}
                clear
                type='number'
                placeholder="?????????????????????"
              >
                ????????????
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
            title='????????????'
            footer={[
              { text: '??????', onPress: () => this.handleDeleteDiy(false, {}) },
              { text: '??????', onPress: () => { this.onDeleteDiy() } },
            ]}
          >
            <div style={{ height: '100px', textAlign: 'center', marginTop: 20 }}>
              ???????????????????????????<br />{this.state.willDeleteMyDiy.name}
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
            <div style={{ color: ' #fff' }}>????????????</div>
          </div>
          <div onClick={this.handleItemTabs} >
            <img src={chanPinIcon} style={{ width: "35px", height: "35px", margin:'0 0 4px 0' }}></img>
            <div style={{ color: ' #fff' }}>????????????</div>
          </div>
          <div onClick={() => this.handleShowMyDiy(true)} >
            <img src={fangAnIcon} style={{ width: "35px", height: "35px", margin:'0 0 4px 0' }}></img>
            <div style={{ color: ' #fff' }}>????????????</div>
          </div>
          {/* <div onClick={() => this.handleYuYue(true)} >
            <img src={myDiyImg} style={{ width: "35px", height: "35px", margin:'0 0 4px 0' }}></img>
            <div style={{ color: ' #fff' }}>????????????</div>
          </div> */}
          <div onClick={() => this.handleSaveModal(true, {})} >
            <img src={baoCunIcon} style={{ width: "35px", height: "35px", margin:'0 0 4px 0' }}></img>
            <div style={{ color: ' #fff' }}>??????</div>
          </div>
        </div>
      </div>
    );
  }
}

export default diymuxue;
