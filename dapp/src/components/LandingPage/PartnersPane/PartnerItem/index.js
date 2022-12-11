import React from 'react'

import { 
    PartnerItemContainer
} from './styles'

import PartnerItemBackSVG from '../../../../assets/svg/partners-item-back.svg'

const PartnerItem = (props) => {
    const {icon} = props

    return (
        <PartnerItemContainer>
            <div className='back-frame'>
                <img src={PartnerItemBackSVG} alt='' />
            </div>
            <div className='item-image'>
                {icon}
            </div>
        </PartnerItemContainer>
    )
}

export default PartnerItem;
