import styled from 'styled-components'

export const DashboardPageContainer = styled.div`
    display: flex;
    flex-direction: row;

    .right-area {
        flex: 1 1 0;

        display: flex;
        flex-direction: column;
        flex-gap: 40px;
        gap: 40px;

        padding: 20px;

        .row-1 {
            display: flex;
            flex-direction: row;

            flex-gap: 20px;
            gap: 20px;

            .item-2 {
                flex: 1 1 0;
            }
        }

        .multi-panes {
            display: grid;
            grid-template-columns: min-content 1fr min-content;
            grid-template-areas:
                "a b c"
                "d e e";
            column-gap: 40px;
            row-gap: 40px;
        }
    }
`
