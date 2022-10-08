import React, { Component } from 'react'
import { Toast } from 'antd-mobile';
import './index.css'

class Nfc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result:"",
    }
  }

  componentDidMount(){
    const _this = this;
    // eslint-disable-next-line no-undef
    if (cordova.platformId === "android" || cordova.platformId === "windows") {
      setTimeout(
          function () {
            // eslint-disable-next-line no-undef
              cordova.exec(
                  function () {
                      console.log("Initialized the NfcPlugin");
                      _this.initNFC();
                      _this.setState({
                        result: "手机NFC功能已开启"
                      })
                  },
                  function (reason) {
                      console.log("Failed to initialize the NfcPlugin " + reason);
                      if(reason==="NO_NFC"){
                        Toast.info("手机不支持NFC功能", 3);
                        _this.setState({
                          result: "手机不支持NFC功能"
                        })
                      }
                      if(reason==="NFC_DISABLED"){
                        Toast.info("手机NFC功能未开启", 3);
                        _this.setState({
                          result: "手机NFC功能未开启"
                        })
                      }
                  },
                  "NfcPlugin", "init", []
              );
          }, 10
      );
    }
  }

  initNFC(){
    // eslint-disable-next-line no-undef
    nfc.addNdefListener(
      function(){
          //console.log(nfc.bytesToString(nfcEvent.tag.ndefMessage[0].payload));
          console.log("addNdefListener");
      },
      function(){
          console.log("addNdefListener registered");
      },
      function(e){
          console.error("Error registering addNdefListener: " + e);
      }
    );
    // eslint-disable-next-line no-undef
    nfc.addTagDiscoveredListener(
      function(){
          console.log("addTagDiscoveredListener");
      },
      function(){
          console.log("addTagDiscoveredListener registered");
      },
      function(e){
          console.error("Error registering addTagDiscoveredListener: " + e);
      }
    );
    // eslint-disable-next-line no-undef
    nfc.addMimeTypeListener(
      "text/pg", 
      function(){
          console.log("addMimeTypeListener");
      },
      function(){
          console.log("addMimeTypeListener registered");
      },
      function(e){
          console.error("Error registering addMimeTypeListener: " + e);
      }
    );
    // eslint-disable-next-line no-undef
    nfc.addNdefFormatableListener(
        function(){
            console.log("addNdefFormatableListener");
        },
        function(){
            console.log("addNdefFormatableListener registered");
        },
        function(e){
            console.error("Error registering addNdefFormatableListener: " + e);
        }
    );
  }

  render() {
    const {result} = this.state;
    return (
      <div className='nfc'>
        NFC扫描页面{result}
      </div>
    )
  }
}

export default Nfc