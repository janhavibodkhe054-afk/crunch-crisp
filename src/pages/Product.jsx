import React from 'react'
import ProductHero from '../components/product/ProductHero'
import DetailedProducts from '../components/product/DetailedProducts'
import AgriculturalCommodities from '../components/product/AgriculturalCommodities'
import FrozenFoods from '../components/product/FrozenFoods'
import ProductEnquiry from '../components/product/ProductEnquiry'

const Product = () => {
  return (
    <div>
      <ProductHero/>
      <DetailedProducts/>
      <AgriculturalCommodities/>
      <FrozenFoods/>
      <ProductEnquiry/>
    </div>
  )
}

export default Product
