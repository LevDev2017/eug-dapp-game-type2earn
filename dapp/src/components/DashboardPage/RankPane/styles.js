import styled from 'styled-components'

export const RankPaneContainer = styled.div`
    background: #13141F;

    padding: 10px;
    height: 100%;

    display: flex;
    flex-direction: column;

    flex-gap: 10px;
    gap: 10px;

    .row-frame {
        display: flex;
        flex-direction: row;

        flex-gap: 10px;
        gap: 10px;

        justify-content: space-between;
    }

    .gap-line {
        height: 1px;
        border-top: 1px solid #fff1;
    }

    .value-frame {
        display: grid;
        grid-template-columns: 1fr max-content;

        column-gap: 20px;
        row-gap: 20px;

        .label, .value {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 500;
            font-size: 24px;
            line-height: 28px;
            text-transform: capitalize;
        }
    }
`
