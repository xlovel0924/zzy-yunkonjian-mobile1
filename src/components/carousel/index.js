import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import './carousel.css'

class CarouselPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
    }
  }

  render() {
    return (
      <div className='carousel'>
        <Carousel
          autoplay
          infinite
        >
          {this.state.data.map((val,index) => (
            <img
              key={index}
              src={require(`./../../assets/img/${val}.png`)}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          ))}
        </Carousel>
      </div>
    )
  }
}

export default CarouselPage