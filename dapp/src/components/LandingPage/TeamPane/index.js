import React from 'react'

import {
    TeamPaneContainer
} from './styles'

import TeamMember from './TeamMember'
import TeamMember1 from '../../../assets/images/team-member1.png'
import TeamMember2 from '../../../assets/images/team-member2.png'

const TeamPane = (props) => {
    return (
        <TeamPaneContainer>
            <div>
                <div className='team-label'>core team</div>
                <div className='description-label'>description</div>
            </div>
            <div className='team-array-frame'>
                <TeamMember icon={<img src={TeamMember1} alt='' />} name='anthony mars' type='co-founder' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at vestibulum velit.' selected/>
                <TeamMember icon={<img src={TeamMember1} alt='' />} name='anthony mars' type='developer' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at vestibulum velit.'/>
                <TeamMember icon={<img src={TeamMember2} alt='' />} name='anthony mars' type='CMO' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at vestibulum velit.'/>
                <TeamMember icon={<img src={TeamMember1} alt='' />} name='anthony mars' type='designer' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at vestibulum velit.'/>
            </div>
        </TeamPaneContainer>
    )
}

export default TeamPane;
