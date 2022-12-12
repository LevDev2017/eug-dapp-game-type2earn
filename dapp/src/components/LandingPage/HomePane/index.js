import React from 'react'

import MainVideo from '../../../assets/video/cpu_futuristic.mp4'
import Line1SVG from '../../../assets/svg/line1.svg'
import Circle1SVG from '../../../assets/svg/circle1.svg'
import PNG1 from '../../../assets/images/7 1.png'
import PNG2 from '../../../assets/images/9 1.png'
import FooterSVG from '../../../assets/svg/footer_layout1.svg'

import BgButton from '../../BgButton'

import {
    HomePaneContainer
} from './styles'

const HomePane = (props) => {
    return (
        <HomePaneContainer>
            <div className='video-frame'>
                <video className="card-video"
                    src={MainVideo}
                    // preload="auto"
                    autoPlay
                    loop
                    muted
                >
                    Your browser does not support playing videos.
                </video>
            </div>
            <div className='clip-align'>
                <div className='gap'></div>
                <div className='main-clips'>
                    <div className='left-clip'>
                        <div className='container'>
                            <img src={Line1SVG} alt='' className='line-pos'/>
                            <img src={Circle1SVG} alt='' className='circle-pos'/>
                            <img src={PNG1} alt='' className='image1'/>
                            <img src={PNG2} alt='' className='image2'/>
                        </div>
                    </div>
                    <div className='right-clip'>
                        <div className='welcome-text'>
                            <div className='white'>Welcome To</div>
                            <div className='green'>Type2Earn</div>
                        </div>
                        <div className='description'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </div>
                        <div className='button-frame'>
                            <BgButton label='presale link' dense/>
                            <BgButton label='docs'/>
                        </div>
                    </div>
                </div>
                <div id='about-us' className='clip-footer'>
                    <img src={FooterSVG} alt='' style={{position: 'relative', top: '6px'}}/>
                </div>
            </div>
        </HomePaneContainer>
    )
}

export default HomePane;
