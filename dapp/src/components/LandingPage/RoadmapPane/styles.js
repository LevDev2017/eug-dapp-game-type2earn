import styled from 'styled-components'

import RoadmapBackground from '../../../assets/images/roadmap-background.png'

export const RoadmapPaneContainer = styled.div`
    display: flex;
    flex-direction: column;

    flex-gap: 20px;
    gap: 20px;

    background: url(${RoadmapBackground});
    background-size: 100% 100%;

    .bar-frame {
        width: 100%;

        img {
            width: 100%;
        }
    }

    .off-6px {
        position: relative;
        top: 6px;
    }
`
