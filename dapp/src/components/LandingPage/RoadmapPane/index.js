import React from 'react'

import {
    RoadmapPaneContainer
} from './styles'

import Bar1SVG from '../../../assets/svg/footer_layout2.svg'
import Bar2SVG from '../../../assets/svg/footer_layout3.svg'

import RoadmapContent from './RoadmapContent'

const RoadmapPane = (props) => {
    return (
        <RoadmapPaneContainer>
            <div id='roadmap' className='bar-frame'>
                <img src={Bar1SVG} alt='' />
            </div>
            <RoadmapContent />
            <div id='contact' className='bar-frame off-6px'>
                <img src={Bar2SVG} alt='' />
            </div>
        </RoadmapPaneContainer>
    )
}

export default RoadmapPane;
