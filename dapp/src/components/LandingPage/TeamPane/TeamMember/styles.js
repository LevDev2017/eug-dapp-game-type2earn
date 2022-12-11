import styled from 'styled-components'

import TeamMemberBack from '../../../../assets/svg/team-member-back.svg'

export const TeamMemberContainer = styled.div`
    padding: 20px;
    background: url(${TeamMemberBack});

    position: relative;

    display: flex;
    flex-direction: column;

    flex-gap: 10px;
    gap: 10px;

    align-items: center;

    img {
        max-width: 200px;
    }

    .name {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        text-transform: capitalize;
    }

    .type {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 150%;
        /* identical to box height */

        text-align: center;
        text-transform: capitalize;
    }

    .selected-frame {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        img {
            width: 100%;
            height: 100%;

            max-width: none;
        }
    }

    .selected-content {
        padding: 30px 10px;

        display: flex;
        flex-direction: column;

        flex-gap: 10px;
        gap: 10px;

        .name {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            text-align: left !important;
            text-transform: capitalize;
        }

        .description {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 500;
            font-size: 17px;
            line-height: 28px;
        }
    }
`