import React from 'react'

import {
    ProgressBarContainer
} from './styles'

const ProgressBar = (props) => {
    return (
        <ProgressBarContainer percent={props.percent}>
            <div className='typing-progress'></div>
        </ProgressBarContainer>
    )
}

export default ProgressBar;
