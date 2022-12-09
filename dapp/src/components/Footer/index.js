import React, { useEffect, useState, useCallback } from 'react'

import {
  FooterContainer,
  SocialsFlex,
  SocialFlex,
  SocialBox,
  MarginDiv
} from './styles'

export const Footer = (props) => {

  return (
    <FooterContainer>
      <div className='main-frame'>
        <SocialsFlex>
          <SocialButton
              text="Discord"
              url="https://discord.com/invite/zJRpUZepnV"
              icon={
                <i className="fa-brands fa-discord"></i>
              }
            />
        </SocialsFlex>
      </div>
    </FooterContainer>
  )
}

export const SocialButton = ({ icon, text, url }) => {
  return (
    <MarginDiv>
    <a href={url} style={{textDecoration: "none",color:"#ffffff"}} rel='noreferrer' target='_blank'>
      <SocialFlex>
        {icon}
        <SocialBox >{text}</SocialBox>
      </SocialFlex>
    </a>
    </MarginDiv>
  );
};
