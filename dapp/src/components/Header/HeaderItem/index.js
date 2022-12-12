import React from 'react'

import { Link } from 'react-router-dom'

import {
    HeaderItemContainer
} from './styles'

const HeaderItem = (props) => {
    const { selected, icon, label, link, def, desc } = props

    return (
        <HeaderItemContainer selected={selected === undefined? false: selected} def={def === undefined? false: def}>
            {
                selected === true &&
                <div className='selected-bar'></div>
            }
            <Link className='link-frame' to={link}>
                <div className='icon-frame'>
                    {icon}
                    {desc && <div className='desc-label'>{desc}</div>}
                </div>
                <div className='label-frame'>
                    {label}
                </div>
            </Link>
        </HeaderItemContainer>
    )
}

export default HeaderItem;
