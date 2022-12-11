import styled from 'styled-components'

export const FooterContainer = styled.div`
    padding: 40px;

    display: flex;
    flex-direction: row;

    flex-gap: 60px;
    gap: 60px;

    .col {
        display: flex;
        flex-direction: column;

        flex-gap: 10px;
        gap: 10px;

        span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 30px;
            /* identical to box height, or 125% */

            text-transform: capitalize;

            color: #61F908;

            opacity: 0.8;
        }

        p {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 160%;
        }

        .row {
            display: flex;
            flex-direction: row;

            flex-gap: 10px;
            gap: 10px;
        }
    }
`
