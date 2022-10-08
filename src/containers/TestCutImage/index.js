// import {message, Modal, Upload} from 'antd';
// import React, {useEffect, useState} from 'react';
// import {DeleteOutlined, DownloadOutlined, LoadingOutlined, UploadOutlined,} from '@ant-design/icons';
// import {uploadFile} from './components/service';
// import CutImg from "./components/cutImg";
// import Jimp from 'jimp/es';
 
// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('只能上传JPG/PNG文件!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 10;
//   if (!isLt2M) {
//     message.error('上传的文件不能超过10MB!');
//   }
//   return isJpgOrPng && isLt2M;
// }
 
// const UploadCutImage = (props) => {
//   const {onChange, value, disable} = props; // 有默认传来的 chang事件，和 value值
 
//   const [loading, setLoading] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const [imageUrl, setImageUrl] = useState();
//   const [previewImage, setPreviewImage] = useState(null);
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [cutImgVisible, setCutImgVisible] = useState(false);
//   const [originImgUrl, setOriginImgUrl] = useState();
//   const [cutImgUrl, setCutImgUrl] = useState();
 
//   // console.log(value);
 
//   useEffect(() => {
//     if (value !== null && value !== undefined && value.length > 0) {
//       setImageUrl(value);
//       setFileList([
//         {
//           uid: '-1',
//           status: 'done',
//           url: value,
//         },
//       ]);
//     } else {
//       setImageUrl(null);
//       setFileList([]);
//     }
//   }, [value]);
 
//   const uploadButton = (
//     <div>
//       {loading ? <LoadingOutlined/> : <UploadOutlined/>}
//       <div style={{marginTop: 8}}>上传</div>
//     </div>
//   );
 
//   const handleDownload = (info) => {
//     window.location.href = imageUrl;
//   };
 
//   const handleRemove = (info) => {
//     //setFileList([]);
//     setOriginImgUrl(null);
//     setCutImgUrl(null);
//     setImageUrl(null);
//     onChange('');
//     return true;
//   };
  
//   const handlePreview = (info) => {
//     setPreviewImage(imageUrl);
//     setPreviewVisible(true);
//   };
 
//   const handleCancelPreview = () => {
//     setPreviewVisible(false);
//   };
 
//   const handleChange = ({file, fileList}) => {
//     if (file.status == 'removed') {
//       setFileList([]);
//     }
//   };
 
//   const doImgUpload = async (options) => {
//     const {file} = options;
//     const imgItem = {
//       uid: '1', // 注意，这个uid一定不能少，否则上传失败
//       name: file['name'],
//       status: 'uploading',
//       url: '',
//       percent: 99, // 注意不要写100。100表示上传完成
//     };
 
//     setFileList([imgItem]);
 
//     //原始图片上传
//     let formData = new FormData();
//     formData.append('file', file);
 
//     await uploadFile(formData)
//       .then(r => {
//         // 弹出裁剪层，把url传过去
//         const url = r['data']['url'];
//         setOriginImgUrl(url);
//         setCutImgVisible(true);
//       })
//       .catch((e) => {
//         console.log('smyhvae 图片上传失败:' + JSON.stringify(e || ''));
//         message.error('图片上传失败，请重试');
//       });
//   };
 
//   return (
//     <>
//       <CutImg
//         image={originImgUrl}
//         visible={cutImgVisible}
//         onOK={async (data) => {
//           const wh = data['originSize']['width'] < data['originSize']['height'] ? data['originSize']['width'] : data['originSize']['height'];
//           const x = -(data['position']['x'] * (data['originSize']['width'] / data['imgSize']['width'])), y = data['position']['y'], w = wh, h = wh;
 
//           // 裁剪图片&上传
//           await Jimp.read(data['img'],
//             (err, image) => {
//               if (err) throw err;
//               //裁剪图片
//               image.crop(x, y, w, h).getBase64Async(Jimp.MIME_PNG).then((base64Url) => {
//                 let bytes = window.atob(base64Url.split(',')[1]);
//                 let array = [];
//                 for(let i = 0; i < bytes.length; i++){
//                   array.push(bytes.charCodeAt(i));
//                 }
//                 let blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
//                 let formData = new FormData();
//                 const filename = Date.now() + '.png';
//                 formData.append('file', blob, filename);
//                 //上传图片
//                 uploadFile(formData)
//                   .then(r => {
//                     // 关闭裁剪层
//                     const url = r['data']['url'];
//                     setCutImgUrl(url);
//                     setCutImgVisible(false);
//                     const imgItem = {
//                       uid: '1', // 注意，这个uid一定不能少，否则上传失败
//                       name: filename,
//                       status: 'done',
//                       url: url, // url 是展示在页面上的绝对链接
//                       imgUrl: url, // imgUrl 是存到 db 里的相对链接
//                     };
//                     onChange && onChange(url);
//                     setImageUrl(url);
//                     setFileList([imgItem]);
//                   })
//                   .catch((e) => {
//                     console.log('图片上传失败:' + JSON.stringify(e || ''));
//                     message.error('图片上传失败，请重试');
//                   });
//               });
//             })
//         }}
//         onClose={() => {
//           setFileList([]);
//           setCutImgVisible(false);
//         }}
//       />
 
//       <Upload
//         accept="image/jpeg,image/png"
//         multiple={false}
//         name="file"
//         fileList={fileList}
//         listType="picture-card"
//         showUploadList={{
//           showDownloadIcon: true,
//           downloadIcon: <DownloadOutlined style={{color: 'x00000'}}/>,
//           showRemoveIcon: !disable,
//           removeIcon: <DeleteOutlined/>,
//         }}
//         action="2"
//         customRequest={doImgUpload}
//         beforeUpload={beforeUpload}
//         onChange={handleChange}
//         onDownload={handleDownload}
//         onRemove={handleRemove}
//         onPreview={handlePreview}
//         disabled={disable}
//       >
//         {imageUrl ? null : uploadButton}
//       </Upload>
//       <div>
//         <Modal visible={previewVisible} footer={null} onCancel={handleCancelPreview}>
//           <img alt="picture" style={{width: '100%', height: '100%'}} src={previewImage}/>
//         </Modal>
//       </div>
//     </>
//   );
// };
 
// export default UploadCutImage;