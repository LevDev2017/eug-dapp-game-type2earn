import styled from 'styled-components'

export const InfoItemContainer = styled.div`
    border-radius: 20px 0px;
    border: 1px solid #61F908;

    padding: 10px;

    display: flex;
    flex-direction: column;
    flex-gap: 10px;
    gap: 10px;

    .title {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        /* identical to box height */

        text-transform: capitalize;
    }

    .value {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        /* identical to box height */

        text-transform: capitalize;
    }
`