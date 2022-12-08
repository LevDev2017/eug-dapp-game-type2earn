import React, { useRef, useEffect } from 'react'

import {
    ProgressBar2Container
} from './styles'

export const ProgressBar2 = (props) => {
    const {min, max, value, valueSetter} = props

    const pBody = useRef()
    useEffect(() => {
        const setValue = (x, maxx, from, to) => {
            const tfval = from + x * (to - from) / maxx
            valueSetter((Math.floor(tfval * 100) / 100).toString())
        }

        pBody.current.onmousedown = (event) => {
            setValue(event.offsetX, pBody.current.clientWidth, min, max)
            event.preventDefault();
        }

        pBody.current.onmousemove = (event) => {
            if (event.which > 0) {
                setValue(event.offsetX, pBody.current.clientWidth, min, max)
                event.preventDefault();
            }
        }
    }, [min, max, valueSetter])

    return (
        <ProgressBar2Container {...props}>
            <div className='back-frame' ref={pBody}>
                {
                    value >= min && value <= max && <div className='value-frame'></div>
                }
                <div className='min-value'>{min}</div>
                <div className='max-value'>{max}</div>
                {
                    value >= min && value <= max && <div className='value'>{value}</div>
                }
            </div>
        </ProgressBar2Container>
    )
}
