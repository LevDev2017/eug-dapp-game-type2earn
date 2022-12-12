import React from 'react'

import {
    FeaturesPaneContainer
} from './styles'

import FeaturesPNG from '../../../assets/images/features-back.png'
import FeatureItem from './FeatureItem'

import Feature1SVG from '../../../assets/svg/feature1.svg'
import Feature2SVG from '../../../assets/svg/feature2.svg'
import Feature3SVG from '../../../assets/svg/feature3.svg'
import Feature4SVG from '../../../assets/svg/feature4.svg'

const FeaturesPane = (props) => {
    return (
        <FeaturesPaneContainer>
            <div id='features' className='headline'>
                <img src={FeaturesPNG} alt='' />
            </div>
            <div className='titles'>
                <div className='features'>features</div>
                <div className='description'>description</div>
            </div>
            <div className='feature-items'>
                <FeatureItem icon={<img src={Feature1SVG} alt=''/>} title='feature 1' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at vestibulum velit. '/>
                <FeatureItem icon={<img src={Feature2SVG} alt=''/>} title='feature 2' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at vestibulum velit. ' active/>
                <FeatureItem icon={<img src={Feature3SVG} alt=''/>} title='feature 3' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at vestibulum velit. '/>
                <FeatureItem icon={<img src={Feature4SVG} alt=''/>} title='feature 4' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at vestibulum velit. '/>
            </div>
        </FeaturesPaneContainer>
    )
}

export default FeaturesPane;
