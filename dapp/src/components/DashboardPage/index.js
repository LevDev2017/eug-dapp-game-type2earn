import React from 'react'

import {
    DashboardPageContainer
} from './styles'

import Header from '../Header'
import TopBar from './TopBar'
import Avatar from './Avatar'

const DashboardPage = (props) => {
    return (
        <DashboardPageContainer>
            <Header />
            <div className='right-area'>
                <TopBar />
                <div className='row-1'>
                    <div className='item-1'>
                        <Avatar />
                    </div>
                    <div className='item-2'></div>
                </div>
            </div>
        </DashboardPageContainer>
    )
}

export default DashboardPage;
