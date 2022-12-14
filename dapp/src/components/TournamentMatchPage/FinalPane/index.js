import React from 'react'
import PlayerItem from './PlayerItem';

import {
    FinalPaneContainer
} from './styles'

import StandPNG from '../../../assets/images/stand.png'

const FinalPane = (props) => {
    return (
        <FinalPaneContainer>
            <div className='col-frame align-center'>
                <div className='big-label'>challenger league #1</div>
                <div className='green-square uppercase'>top 8 players</div>
                <div className='players-8 relative'>
                    <div className='p-1 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' />
                    </div>
                    <div className='p-2 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' lose/>
                    </div>
                    <div className='p-3 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' lose/>
                    </div>
                    <div className='p-4 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' />
                    </div>
                    <div className='p-5 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' lose/>
                    </div>
                    <div className='p-6 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' />
                    </div>
                    <div className='p-7 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' />
                    </div>
                    <div className='p-8 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' lose/>
                    </div>
                    <div className='p-9 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' />
                    </div>
                    <div className='p-10 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' />
                    </div>
                    <div className='p-11 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' />
                    </div>
                    <div className='p-12 small-position'>
                        <PlayerItem icon={StandPNG} name='Johnny Blaze' />
                    </div>
                    <div className='p-13 big-position'>
                        <PlayerItem  />
                    </div>
                    <div className='p-14 big-position'>
                        <PlayerItem  />
                    </div>
                </div>
            </div>
        </FinalPaneContainer>
    )
}

export default FinalPane;
