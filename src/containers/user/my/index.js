import React from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import { Button, Modal, List } from 'antd-mobile'
import MyHead from '@/components/myHead'
import Split from '@/components/split'
import Help from '@/assets/img/helpt.png'
import About from '@/assets/img/aboutt.png'
import QRCode from 'qrcode.react'
import _ from 'lodash'
import { withRouter, Redirect } from 'react-router-dom'
import { logoutSubmit, getUserInfo, depantmentInfo, postinfo } from './../../../redux/user/user.action'
import './my.css'

@connect(
  state => state.user,
  { logoutSubmit, getUserInfo, depantmentInfo, postinfo }
)
@withRouter
class My extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.state)
    this.state = {
      userInfo: {},
      codeVisible: false,
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.myWrapper = ref => { this.myWrappers = ref }
  }
  componentDidMount () {
    this.initScroll()
    this.props.getUserInfo()
  }
  initScroll () {
    this.myScroll = new BScroll(this.myWrappers, {
      click: true
    })
  }

  handlePush (e) {

    this.props.history.push(`${e}`)
  }
  componentWillReceiveProps (nextProps) {
    if (!_.isEmpty(nextProps)) {
      if (!_.isEmpty(nextProps.userInfo)) {
        this.setState({
          userInfo: nextProps.userInfo
        })
        // console.log("userInfo")
        // console.log(this.state.userInfo)
        this.props.depantmentInfo(this.state.userInfo.key)
      } else {
        this.setState({
          userInfo: {}
        })
      }
    }
  }

  handleLogout () {
    const alert = Modal.alert
    alert('注销', '确认退出登录', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认', onPress: () => {
          this.props.logoutSubmit()
        }
      }
    ])
  }

  // 展示二维码
  showCode = (flag) => {
    this.setState({
      codeVisible: flag
    })
  }


  render () {
    const { codeVisible } = this.state
    const Item = List.Item

    return (
      <div className='r-my'>
        {(this.props.redirectTo !== '' && this.props.redirectTo === '/login') ? <Redirect to={this.props.redirectTo} /> : null}
        <div className='my-content' ref={this.myWrapper}>
          <div className='content'>
            <MyHead handlePush={this.handlePush} user={this.state.userInfo} showCode={this.showCode}></MyHead>
            <Split></Split>
            <List>
              {/* <Item thumb={Info} arrow="horizontal" onClick={() => this.handlePush('myinfo')}>个人资料</Item> */}
              {/* <Item thumb={Order} arrow="horizontal" onClick={() => this.handlePush('modifyPassword')}>修改密码</Item> */}
              <Item thumb={Help}
                onClick={() => this.handlePush('about')}
                arrow="horizontal">考勤记录</Item>
              <Split></Split>
              <Item thumb={About}
                onClick={() => this.handlePush('setup')}
                arrow="horizontal">设置</Item>
            </List>
            {/* <Split></Split>
            <List>
            
            </List>
            <Split></Split> */}
            {/* <Button className='btn logout' onClick={this.handleLogout}>退出登录</Button> */}
          </div>
        </div>
        <Modal
          visible={codeVisible}
          transparent
          maskClosable={false}
          // onClose={this.onClose('modal1')}
          title="二维码"
          footer={[{ text: '关闭', onPress: () => { this.showCode(false) } }]}
        >
          <div className='codeContent'>
            <QRCode
              value={JSON.parse(localStorage.getItem('user')).key}  //value参数为生成二维码的链接
              size={200} //二维码的宽高尺寸
              fgColor="#333"  //二维码的颜色
            />
          </div>
        </Modal>
      </div>
    )
  }
}

export default My