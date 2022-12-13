import React, { useEffect, useRef, useState } from 'react'

import {
    LoadoutItemContainer
} from './styles'

const LoadoutItem = (props) => {
    const { icon, inUse, handleSelect } = props
    const [select, setSelect] = useState(false)

    const myRef = useRef()

    useEffect(() => {
        if (inUse !== true) {
            const onmouseover = (event) => {
                setSelect(true)
            }

            const onmouseout = (event) => {
                setSelect(false)
            }

            myRef.current.addEventListener('mouseover', onmouseover, true)
            myRef.current.addEventListener('mouseout', onmouseout, true)

            return () => {
                myRef.current.removeEventListener('mouseover', onmouseover, true)
                myRef.current.removeEventListener('mouseout', onmouseout, true)
            }
        }
    }, [myRef.current, inUse])

    return (
        <LoadoutItemContainer ref={myRef}>
            {icon}
            {
                inUse !== true && select !== true && <div className='in-use-filter'></div>
            }
            {
                inUse === true && <>
                    <div className='in-use'>in use</div>
                </>
            }
            {
                select === true &&
                <>
                    <div className='select-back'></div>
                    <div className='select' onClick={handleSelect? handleSelect: () => {}}>select</div>
                </>
            }
        </LoadoutItemContainer>
    )
}

export default LoadoutItem;
