// import React, { Component } from "react";
// import { Col, Modal, Button, Slider } from "antd";
// import CutEffect from "./cutEffect";
// import './cutImg.css'
 
// class CutImg extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleOk = this.handleOk.bind(this);
//     this.state = {
//       isPost: false, //是否允许子组件提交表单
//       isUpdate: false //是否初始化裁剪组件状态
//     };
//   }
//   handleCancel() {
//     this.props.onClose();
//     this.openUpdate();
//   }
//   handleOk() {
//     this.setState(() => ({
//       isPost: true
//     }));
//   }
//   closePost() {
//     this.setState(() => ({
//       isPost: false
//     }));
//   }
//   openUpdate() {
//     this.setState(() => ({
//       isUpdate: true
//     }));
//   }
//   closeUpdate() {
//     this.setState(() => ({
//       isUpdate: false
//     }));
//   }
//   render() {
//     const { image, visible, isCloseToUpdate, onOK } = this.props;
//     const { isPost, isUpdate } = this.state;
//     return (
//       <Col xs={24} md={12} className='model_wrap' style={{ ...this.props.style }}>
//         <Modal
//           title='拖动图片调整显示区域'
//           wrapClassName='model_wrap_modal'
//           visible={visible}
//           onOk={this.handleOk}
//           width={500}
//           onCancel={this.handleCancel.bind(this)}
//           footer={[
//             <Button key='back' onClick={this.handleCancel.bind(this)}>
//               取消
//             </Button>,
//             <Button key='submit' type='primary' onClick={this.handleOk}>
//               确定
//             </Button>
//           ]}
//         >
//           <CutEffect
//             imgUrl={image}
//             visible={visible}
//             isPost={isPost}
//             isUpdate={isUpdate}
//             isCloseToUpdate={isCloseToUpdate}
//             closePost={this.closePost.bind(this)}
//             closeUpdate={this.closeUpdate.bind(this)}
//             openUpdate={this.openUpdate.bind(this)}
//             closeCutting={this.handleCancel.bind(this)}
//             onOK={onOK}
//           />
//         </Modal>
//       </Col>
//     );
//   }
// }
// export default CutImg;