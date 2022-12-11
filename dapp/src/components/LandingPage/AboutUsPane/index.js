import React from 'react'

import {
    AboutUsPaneContainer
} from './styles'

const AboutUsPane = (props) => {
    return (
        <AboutUsPaneContainer>
            <div className='left-frame'>
                <div className='video-frame'>
                    <div className='play-icon'>
                        <i className="fa-regular fa-circle-play"></i>
                    </div>
                </div>
            </div>
            <div className='right-frame'>
                <div className='mid'>About Us</div>
                <div className='large'>what is <span className='green'>type2earn</span>?</div>
                <div className='small'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </div>
            </div>
        </AboutUsPaneContainer>
    )
}

export default AboutUsPane
