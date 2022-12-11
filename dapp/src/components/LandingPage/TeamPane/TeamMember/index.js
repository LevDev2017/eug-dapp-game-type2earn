import React from 'react'

import {
    TeamMemberContainer
} from './styles'

import TeamMemberSelected from '../../../../assets/svg/team-member-selected.svg'

const TeamMember = (props) => {
    const {icon, name, type, description, selected} = props

    return (
        <TeamMemberContainer>
            {icon}
            <div className='name'>{name}</div>
            <div className='type'>{type}</div>

            {
                selected &&
                <>
                    <div className='selected-frame'>
                        <img src={TeamMemberSelected} alt='' />
                    </div>
                    <div className='selected-frame selected-content'>
                        <div className='name'>{name}</div>
                        <div className='description'>{description}</div>
                    </div>
                </>
            }
        </TeamMemberContainer>
    )
}

export default TeamMember;
