import styled from 'styled-components'

export const TokenomicsItemContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 20px;
    
    flex-gap: 20px;
    gap: 20px;

    border: 3px solid #fff2;

    .label {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        /* identical to box height, or 143% */

        letter-spacing: 0.2em;
        text-transform: uppercase;
    }

    .value {
        font-family: 'Russo One';
        font-style: normal;
        font-weight: 400;
        font-size: 48px;
        line-height: 130%;
        /* or 62px */

        text-align: center;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }
`
