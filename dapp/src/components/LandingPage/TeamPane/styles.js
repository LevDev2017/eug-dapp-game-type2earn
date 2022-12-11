import styled from 'styled-components'

export const TeamPaneContainer = styled.div`
    padding: 40px;

    display: flex;
    flex-direction: column;
    flex-gap: 20px;
    gap: 20px;

    align-items: center;

    .team-label {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 200%;

        text-align: center;
        letter-spacing: 0.2em;
        text-transform: uppercase;

        color: #61F908;
    }

    .description-label {
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

    .team-array-frame {
        display: flex;
        flex-direction: row;

        flex-gap: 20px;
        gap: 20px;
    }
`
