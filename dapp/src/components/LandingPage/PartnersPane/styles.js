import styled from 'styled-components'

export const PartnersPaneContainer = styled.div`
    padding: 40px 20px 80px 20px;

    display: flex;
    flex-direction: column;

    flex-gap: 40px;
    gap: 40px;

    .title {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 200%;
        /* identical to box height, or 83% */

        text-align: center;
        letter-spacing: 0.2em;
        text-transform: uppercase;

        color: #61F908;
    }

    .description {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 130%;
        /* identical to box height, or 47px */

        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .partner-frame {
        display: flex;
        flex-direction: row;
        justify-content: center;

        flex-gap: 10px;
        gap: 10px;
    }

    .off-1 {
        position: relative;
        left: 20%;
    }

    .off-2 {
        position: relative;
        left: -20%;
    }
`
