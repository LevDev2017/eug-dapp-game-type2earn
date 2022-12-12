import styled from 'styled-components'

export const WelcomePaneContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-gap: 20px;
    gap: 20px;

    padding: 20px;
    background: #13141F;

    .headline {
        display: flex;
        flex-direction: row;
        align-items: center;

        flex-gap: 10px;
        gap: 10px;

        .gap {
            flex: 1 1 0;
        }

        .welcome {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 40px;
            line-height: 47px;
            /* identical to box height */

            text-transform: capitalize;
        }

        .token-price {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            /* identical to box height */

            text-align: center;
            text-transform: capitalize;

        }
    }

    .description {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */

        text-transform: capitalize;
    }

    .info {
        padding: 20px 0;

        display: flex;
        flex-direction: row;

        flex-gap: 20px;
        gap: 20px;
    }
`
