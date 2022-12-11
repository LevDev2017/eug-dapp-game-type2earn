import React from 'react'

import {
    FooterContainer
} from './styles'

import LogoSVG from '../../../assets/svg/logo.svg'
import TwitterSVG from '../../../assets/svg/twitter.svg'
import FacebookSVG from '../../../assets/svg/facebook.svg'
import TelegramSVG from '../../../assets/svg/telegram.svg'
import YoutubeSVG from '../../../assets/svg/youtube.svg'
import TiktokSVG from '../../../assets/svg/tiktok.svg'
import DiscordSVG from '../../../assets/svg/discord.svg'

const Footer = (props) => {
    return (
        <FooterContainer>
            <div className='col'>
                <img src={LogoSVG} alt='' width='240px'/>
                <span>join our community</span>
                <p>Follow us on social media to stay informed of our last updates.</p>
            </div>
            <div className='col'>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <div className='row'>
                    <a href='' target='_blank' rel='noreferrer'>
                        <img src={TwitterSVG} alt='' />
                    </a>
                    <a href='' target='_blank' rel='noreferrer'>
                        <img src={FacebookSVG} alt='' />
                    </a>
                    <a href='' target='_blank' rel='noreferrer'>
                        <img src={TelegramSVG} alt='' />
                    </a>
                    <a href='' target='_blank' rel='noreferrer'>
                        <img src={YoutubeSVG} alt='' />
                    </a>
                    <a href='' target='_blank' rel='noreferrer'>
                        <img src={TiktokSVG} alt='' />
                    </a>
                    <a href='' target='_blank' rel='noreferrer'>
                        <img src={DiscordSVG} alt='' />
                    </a>
                </div>
            </div>
        </FooterContainer>
    )
}

export default Footer;
