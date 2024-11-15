import HomeHeroCarosol from '@/components/product/home-hero-carsol'
import { heroBannarList } from '@/data/productData'
import React from 'react'

export default function HomeHero() {
  return (
    <div>
        <HomeHeroCarosol data={heroBannarList}></HomeHeroCarosol>
    </div>
  )
}
