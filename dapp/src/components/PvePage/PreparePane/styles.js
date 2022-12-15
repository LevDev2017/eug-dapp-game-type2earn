import styled from 'styled-components'

export const PreparePaneContainer = styled.div`
    display: flex;
    flex-direction: column;

    flex-gap: 30px;
    gap: 30px;

    .row-frame {
        display: flex;
        flex-direction: row;

        flex-gap: 20px;
        gap: 20px;
    }

    .col-frame {
        display: flex;
        flex-direction: column;

        flex-gap: 20px;
        gap: 20px;
    }

    .variable-item {
        flex: 1 1 0;
    }

    .remaining-frame {
        text-align: center;

        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;

        text-transform: uppercase;

        span {
            padding-left: 20px;
            color: #61F908;
        }
    }

    .level-frame {
        width: 100%;

        overflow-y: hidden;
        overflow-x: auto;

        .level-contents {
            display: flex;
            flex-direction: row;

            flex-gap: 10px;
            gap: 10px;
        }
    }

    .play-frame {
        display: flex;
        flex-direction: row;

        justify-content: center;
    }
`
