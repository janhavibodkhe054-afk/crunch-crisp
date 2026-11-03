import React from 'react'
import QualityHero from '../components/quality/QualityHero'
import QualityApproach from '../components/quality/QualityApproach'
import ProductProcessingJourney from '../components/quality/ProductProcessingJourney'
import PackagingBulkSupply from '../components/quality/PackagingBulkSupply'
import QualityCTA from '../components/quality/QualityCTA'

const Quality = () => {
  return (
    <div>
      <QualityHero/>
      <QualityApproach/>
      <ProductProcessingJourney/>
      <PackagingBulkSupply/>
      <QualityCTA/>
    </div>
  )
}

export default Quality
