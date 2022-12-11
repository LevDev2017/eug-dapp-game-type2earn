import styled from 'styled-components'

export const FeaturesPaneContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-gap: 40px;
    gap: 40px;

    padding-bottom: 60px;

    .headline {
        img {
            width: 100%;
        }
    }

    .titles {
        .features {
            font-family: 'Rubik';
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
            font-weight: 600;
            font-size: 36px;
            line-height: 130%;
            /* identical to box height, or 47px */

            text-align: center;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }
    }

    .feature-items {
        display: flex;
        flex-direction: row;

        flex-gap: 20px;
        gap: 20px;

        justify-content: center;
    }
`
