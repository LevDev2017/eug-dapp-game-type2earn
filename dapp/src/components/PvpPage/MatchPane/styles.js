import styled from 'styled-components'

export const MatchPaneContainer = styled.div`
    padding: 20px;
    width: 100%;

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

    .align-center {
        align-items: center;
    }

    .justify-center {
        justify-content: center;
    }

    .justify-fit {
        justify-content: space-evenly;
    }

    .full-width {
        width: 100%;
        overflow: hidden;
    }

    .label {
        font-size: 24px;
        text-align: center;
    }

    .small-label {
        font-size: 16px;
        text-align: center;
    }

    .capitalize {
        text-transform: capitalize;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .green-square {
        padding: 6px 12px;
        background: #61F908;

        font-size: 16px;
        color: black;
    }

    .green {
        color: #61F908;
    }

    .padding-top-100 {
        padding-top: 100px;
    }

    .relative {
        position: relative;
    }

    .opponent-label {
        position: absolute;
        top: -100px;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .gap-5 {
        flex-gap: 5px !important;
        gap: 5px !important;
    }

    .line-1 {
        font-size: 12px;
    }

    .line-2 {
        font-size: 16px;
    }

    .typing-content {
        font-size: 20px;
        word-break: break-all;
        text-transform: uppercase;

        position: relative;
    }

    .typed-area {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`