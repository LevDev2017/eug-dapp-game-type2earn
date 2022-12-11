import React from 'react'

import {
    RoadmapContentContainer
} from './styles'

import RoadmapBackgroundSVG from '../../../../assets/svg/roadmap-background.svg'
import RoadmapBackPieceSVG from '../../../../assets/svg/roadmap-back-piece.svg'
import StandPNG from '../../../../assets/images/stand.png'
import KeyboardPNG from '../../../../assets/images/keyboard.png'
import SmallKeyboardPNG from '../../../../assets/images/small-keyboard.png'

const RoadmapContent = (props) => {
    return (
        <RoadmapContentContainer>
            <div>
                <div className='title'>roadmap</div>
                <div className='description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            </div>
            <div className='segment-frame'>
                <div className='segment-1'>
                    <div className='circle-1'></div>
                    <div className='segment-title-frame'>
                        <div className='line-1'></div>
                        <div className='segment-title'>
                            <span>Phase 01</span>-Prelaunch
                        </div>
                    </div>
                    <div className='segment-content-frame'>
                        <div className='segment-content'>
                            <img src={RoadmapBackgroundSVG} alt='' className='main-back'/>
                            <img src={RoadmapBackPieceSVG} alt='' className='piece-back'/>
                            <div className='content-item'>
                                <div>• Private round</div>
                                <div>• Smart contract</div>
                                <div>• Launching social media (Telegram, Twitter, Discord, Channels)</div>
                            </div>
                            <div className='content-item'>
                                <div>• Beta Dapp</div>
                                <div>• NFTs designing</div>
                                <div>• Community Giveaway Event</div>
                            </div>
                            <div className='content-item'>
                                <div>• Whitelist contests</div>
                                <div>• Audit and KYC process</div>
                            </div>
                            <div className='content-item'>
                                <div className='image-frame'>
                                    <img src={StandPNG} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='segment-1 border-left-dot'>
                    <div className='circle-2'></div>
                    <div className='segment-title-frame'>
                        <div className='line-2'></div>
                        <img src={KeyboardPNG} alt='' style={{position: 'relative', width: '200px', top: '-40px', padding: '0px 20px'}}/>
                        <div className='segment-title'>
                            <span>Phase 02</span>-Launch
                        </div>
                    </div>
                    <div className='segment-content-frame'>
                        <div className='segment-content'>
                            <img src={RoadmapBackgroundSVG} alt='' className='main-back'/>
                            <img src={RoadmapBackPieceSVG} alt='' className='piece-back'/>
                            <div className='content-item'>
                                <div>• Mainstream Marketing Plan</div>
                                <div>• Presale round</div>
                                <div>• Launching NFTs sale event</div>
                            </div>
                            <div className='content-item'>
                                <div>• Launching official Dapp</div>
                                <div>• Listing on Coinmarketcap</div>
                                <div>• Listing on Dapp radar</div>
                            </div>
                            <div className='content-item'>
                                <div>• Listing on Coingecko</div>
                                <div>• Big partnership with KOLs, influencers on Twitter</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='segment-1 border-left-dot'>
                    <div className='circle-2'></div>
                    <div className='segment-title-frame'>
                        <div className='line-1'></div>
                        <div className='segment-title'>
                            <span>Phase 03</span>-Mainstream Application
                        </div>
                    </div>
                    <div className='segment-content-frame'>
                        <div className='segment-content'>
                            <img src={RoadmapBackgroundSVG} alt='' className='main-back'/>
                            <img src={RoadmapBackPieceSVG} alt='' className='piece-back'/>
                            <div className='content-item'>
                                <div>• Private round</div>
                                <div>• Smart contract</div>
                                <div>• Launching social media (Telegram, Twitter, Discord, Channels)</div>
                            </div>
                            <div className='content-item'>
                                <div>• Beta Dapp</div>
                                <div>• NFTs designing</div>
                                <div>• Community Giveaway Event</div>
                            </div>
                            <div className='content-item'>
                                <div>• Whitelist contests</div>
                                <div>• Audit and KYC process</div>
                            </div>
                            <div className='content-item'>
                                <div className='image-frame'>
                                    <img src={StandPNG} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='segment-1 border-left-dot'>
                    <div className='circle-2'></div>
                    <div className='segment-title-frame'>
                        <div className='line-2'></div>
                        <img src={SmallKeyboardPNG} alt='' style={{position: 'relative', width: '200px', top: '-40px', padding: '0px 20px'}}/>
                        <div className='segment-title'>
                            <span>Phase 04</span>-Go Global
                        </div>
                    </div>
                    <div className='segment-content-frame'>
                        <div className='segment-content'>
                            <img src={RoadmapBackgroundSVG} alt='' className='main-back'/>
                            <img src={RoadmapBackPieceSVG} alt='' className='piece-back'/>
                            <div className='content-item'>
                                <div>• Mainstream Marketing Plan</div>
                                <div>• Presale round</div>
                                <div>• Launching NFTs sale event</div>
                            </div>
                            <div className='content-item'>
                                <div>• Launching official Dapp</div>
                                <div>• Listing on Coinmarketcap</div>
                                <div>• Listing on Dapp radar</div>
                            </div>
                            <div className='content-item'>
                                <div>• Listing on Coingecko</div>
                                <div>• Big partnership with KOLs, influencers on Twitter</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RoadmapContentContainer>
    )
}

export default RoadmapContent;
