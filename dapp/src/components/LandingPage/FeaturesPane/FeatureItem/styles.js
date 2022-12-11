import styled from 'styled-components'

export const FeatureItemContainer = styled.div`
    padding: 20px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(90deg, rgba(255, 255, 255, 0.1) -1.52%, rgba(255, 255, 255, 0.024) 104.35%);
    border: ${props => props.active === undefined? 'none': '3px solid #61F908'};

    display: flex;
    flex-direction: column;

    flex-gap: 10px;
    gap: 10px;

    align-items: center;

    max-width: 280px;

    .title {
        padding-top: 20px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        text-align: center;

        color: #61F908;

        text-transform: capitalize;
    }

    .description {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 17px;
        line-height: 28px;
        /* or 165% */

        text-align: center;

    }
`