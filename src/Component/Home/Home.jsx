import React from 'react'
import LerftList from '../LeftList/LerftList'
import homeImg from '../../assets/22f98b38-ccd9-4dbf-80c1-41d6ee983dc0-cover.png'
import HeadSLider from '../HeadSlider/HeadSLider'
import FlashSale from '../FlashSale/FlashSale'
export default function Home() {
  return <>
  <div className="row">
    <div className="col-md-3">
  <LerftList></LerftList>
    </div>
    <div className="col-md-8 mt-3 bg-opacity-75 rounded-2  ">
      <HeadSLider></HeadSLider>
    </div>
  </div>
    <FlashSale></FlashSale>
  
  </>
}
