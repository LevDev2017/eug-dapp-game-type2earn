import React from 'react'

import {
    InventoryPageContainer
} from './styles'

import Header from '../Header'
import TopBar from '../TopBar'

const InventoryPage = (props) => {
    return (
        <InventoryPageContainer>
            <Header />
            <div className='right-area'>
                <TopBar />
            </div>
        </InventoryPageContainer>
    )
}

export default InventoryPage;
