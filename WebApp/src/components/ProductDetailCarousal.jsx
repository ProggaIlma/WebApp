"use client";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import {  Autoplay, Pagination } from 'swiper/modules';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


function CustomPaging({images}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[ Autoplay,Pagination]}
        className="mySwiper2"
      >
        {
          images.map((item,i)=>{
            return <SwiperSlide key={i}>  <div className="swiper-zoom-container">
            <img src={item} style={{display:"block",width:"100%",height:'auto',objectFit:'cover',cursor:'zoom-in'}}/></div>
          </SwiperSlide>
          })
        }
      </Swiper>
      
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
    
      >
        <div className="flex justify-center items-center">
        {
          images.map((item,i)=>{
            return <SwiperSlide key={i}>
            <img src={item} style={{display:"block",width:"100%"}}/>
          </SwiperSlide>
          })
        }</div>
      </Swiper>
    </>
  );
}

export default CustomPaging;
