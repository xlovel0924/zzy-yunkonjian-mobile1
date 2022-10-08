import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import gg from '@/assets/img/gg.png'
import './notice.css';

class Notice extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className='notice'>
        <Carousel className="notice-content"
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplayInterval={5000}
          autoplay
          infinite
        >
          <div className="notice-item">
            <img src={gg} alt='gg' />
            <div className='notice-name'>习近平回信寄语全国涉农高校广大师生：以立德树人为根本 以强农兴农为己任</div>
          </div>
          <div className="notice-item">
            <img src={gg} alt='gg' />
            <div className='notice-name'>发改委副主任回应猪肉涨价：增加猪肉等供应</div>
          </div>
          <div className="notice-item">
            <img src={gg} alt='gg' />
            <div className='notice-name'>尼斯湖水怪之谜揭晓?科研团队:可能是一条巨型鳗鱼</div>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default Notice