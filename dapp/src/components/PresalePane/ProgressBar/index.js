import React, { useEffect, useState } from 'react'

import {
    ProgressBarContainer
} from './styles'

export const ProgressBar = (props) => {
    const {min, max, value} = props

    return (
        <ProgressBarContainer {...props}>
            <div className='back-frame'>
                <div className='value-frame'></div>
                <div className='min-value'>{min}</div>
                <div className='max-value'>{max}</div>
                <div className='value'>{value}</div>
            </div>
        </ProgressBarContainer>
    )
}
