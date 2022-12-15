import React, { useCallback, useEffect, useState } from 'react'

import {
    KeyboardLayoutContainer
} from './styles'

const KeyboardLayout = (props) => {
    const { dispatch, selectedChar, enabled } = props

    const [keyParams, setKeyParams] = useState([
        {key: '1', key2: '1', row: 1, selected: false},
        {key: '2', key2: '2', row: 1, selected: false},
        {key: '3', key2: '3', row: 1, selected: false},
        {key: '4', key2: '4', row: 1, selected: false},
        {key: '5', key2: '5', row: 1, selected: false},
        {key: '6', key2: '6', row: 1, selected: false},
        {key: '7', key2: '7', row: 1, selected: false},
        {key: '8', key2: '8', row: 1, selected: false},
        {key: '9', key2: '9', row: 1, selected: false},
        {key: '0', key2: '0', row: 1, selected: false},
        {key: 'q', key2: 'Q', row: 2, selected: false},
        {key: 'w', key2: 'W', row: 2, selected: false},
        {key: 'e', key2: 'E', row: 2, selected: false},
        {key: 'r', key2: 'R', row: 2, selected: false},
        {key: 't', key2: 'T', row: 2, selected: false},
        {key: 'y', key2: 'Y', row: 2, selected: false},
        {key: 'u', key2: 'U', row: 2, selected: false},
        {key: 'i', key2: 'I', row: 2, selected: false},
        {key: 'o', key2: 'O', row: 2, selected: false},
        {key: 'p', key2: 'P', row: 2, selected: false},
        {key: 'a', key2: 'A', row: 3, selected: false},
        {key: 's', key2: 'S', row: 3, selected: false},
        {key: 'd', key2: 'D', row: 3, selected: false},
        {key: 'f', key2: 'F', row: 3, selected: false},
        {key: 'g', key2: 'G', row: 3, selected: false},
        {key: 'h', key2: 'H', row: 3, selected: false},
        {key: 'j', key2: 'J', row: 3, selected: false},
        {key: 'k', key2: 'K', row: 3, selected: false},
        {key: 'l', key2: 'L', row: 3, selected: false},
        {key: 'z', key2: 'Z', row: 4, selected: false},
        {key: 'x', key2: 'X', row: 4, selected: false},
        {key: 'c', key2: 'C', row: 4, selected: false},
        {key: 'v', key2: 'V', row: 4, selected: false},
        {key: 'b', key2: 'B', row: 4, selected: false},
        {key: 'n', key2: 'N', row: 4, selected: false},
        {key: 'm', key2: 'M', row: 4, selected: false},
        {key: ' ', key2: ' ', row: 5, selected: false},
    ])

    useEffect(() => {
        let k
        let ret = []
        for (k of keyParams) {
            if (k.key.toUpperCase() === selectedChar.toUpperCase()) {
                k.selected = true
            } else {
                k.selected = false
            }

            ret = [...ret, k]
        }

        setKeyParams(ret)
    }, [selectedChar])

    const keyPressHandler = useCallback(ch => {
        let k
        for (k of keyParams) {
            if (k.key.toUpperCase() === ch.toUpperCase()) {
                dispatch && dispatch(k.key)
            }
        }
    }, [keyParams, dispatch])

    useEffect(() => {
        const onKeyPress = (event) => {
            if (enabled === true) {
                keyPressHandler(event.key)
            }
        }

        window.addEventListener('keypress', onKeyPress)

        return () => {
            window.removeEventListener('keypress', onKeyPress)
        }
    }, [keyPressHandler, enabled])

    return (
        <KeyboardLayoutContainer>
            <div className='key-row'>
                {
                    keyParams.filter(k => k.row === 1).map((k, idx) => {
                        return <div key={idx} className={`key ${k.selected === true? 'green-2': ''}`}>{k.key}</div>
                    })
                }
            </div>
            <div className='key-row'>
                {
                    keyParams.filter(k => k.row === 2).map((k, idx) => {
                        return <div key={idx} className={`key ${k.selected === true? 'green-2': ''}`}>{k.key}</div>
                    })
                }
            </div>
            <div className='key-row'>
                {
                    keyParams.filter(k => k.row === 3).map((k, idx) => {
                        return <div key={idx} className={`key ${k.selected === true? 'green-2': ''}`}>{k.key}</div>
                    })
                }
            </div>
            <div className='key-row'>
                {
                    keyParams.filter(k => k.row === 4).map((k, idx) => {
                        return <div key={idx} className={`key ${k.selected === true? 'green-2': ''}`}>{k.key}</div>
                    })
                }
            </div>
            <div className='key-row'>
                {
                    keyParams.filter(k => k.row === 5).map((k, idx) => {
                        return <div key={idx} className={`key ${k.selected === true? 'green-2': ''} ${k.key === ' '? 'space': ''}`}>{k.key === ' '? 'A': k.key}</div>
                    })
                }
            </div>
        </KeyboardLayoutContainer>
    )
}

export default KeyboardLayout;
