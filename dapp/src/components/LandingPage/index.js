import React from 'react'

import {
    LandingPageContainer
} from './styles'

import Header from './Header'
import HomePane from './HomePane'
import AboutUsPane from './AboutUsPane'
import FeaturesPane from './FeaturesPane'
import TokenomicsPane from './TokenomicsPane'
import TeamPane from './TeamPane'
import PartnersPane from './PartnersPane'
import RoadmapPane from './RoadmapPane'
import Footer from './Footer'

const LandingPage = (props) => {
    return (
        <LandingPageContainer>
            <Header />
            <HomePane />
            <AboutUsPane />
            <FeaturesPane />
            <TokenomicsPane />
            <TeamPane />
            <PartnersPane />
            <RoadmapPane />
            <Footer />
        </LandingPageContainer>
    )
}

export default LandingPage
