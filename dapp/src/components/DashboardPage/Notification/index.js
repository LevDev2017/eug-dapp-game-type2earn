import React from 'react'
import NotificationItem from './NotificationItem';

import {
    NotificationContainer
} from './styles'

const Notification = (props) => {
    return (
        <NotificationContainer>
            <div className='label'>notification</div>
            <div className='content-frame'>
                <NotificationItem content='$TTE Staking Is Live' date='Oct 28(Wed)' button='GO TO STAKE' link='' bar />
                <NotificationItem content='Server Is Under Maintenance' date='Oct 28(Wed)' />
            </div>
        </NotificationContainer>
    )
}

export default Notification;
