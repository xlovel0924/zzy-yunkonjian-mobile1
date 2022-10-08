import React, { Component } from 'react';
// import { Swiper, SwiperSlide } from "swiper/react";
//根据自己的需要引用样式
// import 'swiper/swiper.less';

import UploadCutImage from './TestCutImage/index'


export class test extends Component {
    render() {
        return (
            <div>
                {/* <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                </Swiper> */}
                <UploadCutImage disable={false} />
            </div>
        )
    }
}

export default test