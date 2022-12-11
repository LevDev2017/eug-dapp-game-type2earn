import React from 'react'

import {
    PartnersPaneContainer
} from './styles'

import PartnerItem from './PartnerItem'

import PartnerItem1SVG from '../../../assets/svg/partner-item1.svg'
import PartnerItem2SVG from '../../../assets/svg/partner-item2.svg'
import PartnerItem3SVG from '../../../assets/svg/partner-item3.svg'
import PartnerItem4SVG from '../../../assets/svg/partner-item4.svg'
import PartnerItem5SVG from '../../../assets/svg/partner-item5.svg'
import PartnerItem6SVG from '../../../assets/svg/partner-item6.svg'

const PartnersPane = (props) => {
    return (
        <PartnersPaneContainer>
            <div>
                <div className='title'>partners</div>
                <div className='description'>description</div>
            </div>
            <div className='partner-frame off-1'>
                <PartnerItem icon={<img src={PartnerItem1SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem2SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem3SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem4SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem5SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem6SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem1SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem2SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem3SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem4SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem5SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem6SVG} alt='' />} />
            </div>
            <div className='partner-frame off-2'>
                <PartnerItem icon={<img src={PartnerItem1SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem2SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem3SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem4SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem5SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem6SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem1SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem2SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem3SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem4SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem5SVG} alt='' />} />
                <PartnerItem icon={<img src={PartnerItem6SVG} alt='' />} />
            </div>
        </PartnersPaneContainer>
    )
}

export default PartnersPane;
