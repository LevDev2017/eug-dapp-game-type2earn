import React from 'react'
import { Link } from 'react-router-dom'

import {
    NotificationItemContainer
} from './styles'

const NotificationItem = (props) => {
    const { content, date, button, link, bar } = props

    return (
        <NotificationItemContainer>
            <div>{content}</div>
            <div>{date}</div>
            {
                button &&
                <div className='button-frame'>
                    <Link to={link} className='link-frame'>{button}</Link>
                </div>
            }
            {bar && <div className='gap-bar'></div>}
        </NotificationItemContainer>
    )
}

export default NotificationItem;
