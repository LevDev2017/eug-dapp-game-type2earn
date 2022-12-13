import styled from 'styled-components'

export const TypingLevelItemContainer = styled.div`
    position: relative;

    user-select: none;

    .img-fix-width {
        width: 200px;
    }

    .typing-level {
        position: absolute;
        left: 50%;
        bottom: 32px;

        transform: translate(-50%, 0);

        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        /* identical to box height */

        text-align: center;
        text-transform: capitalize;

        white-space: nowrap;

        .number {
            color: black;

            padding: 6px 12px;
            margin-left: 20px;
            background: #61F908;
        }
    }

    .hide {
        display: none;
    }

    .show {
        display: block;
    }

    .endark {
        position: absolute;

        left: 0;
        top: 0;
        right: 0;
        bottom: 6px;

        background: #0006;

        backdrop-filter: blur(2px);
    }

    .bright {
        position: absolute;

        left: 0;
        top: 0;
        right: 0;
        bottom: 6px;

        background: #fff0;

        cursor: pointer;

        transition: all .1s ease-in-out;

        &:hover {
            background: #fff2;
        }

        &:active {
            background: #0004;
        }
    }

    .unlock-frame {
        position: absolute;

        left: 0;
        top: 0;
        right: 0;
        bottom: 6px;

        display: flex;
        flex-direction column;

        justify-content: center;
        align-items: center;

        padding: 20px;
        
        flex-gap: 10px;
        gap: 10px;

        span {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            text-align: center;
            text-transform: uppercase;
        }
    }

    .normal-border {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 6px;

        border: 1px solid #fff4;
    }

    .thick-border {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 6px;

        border: 3px solid #fff4;
    }

    .corner-1 {
        position: absolute;

        left: 0;
        top: 0;
        width: 20px;
        height: 20px;

        border-width: 4px 0 0 4px;
        border-style: solid;
        border-color: #61F908;
    }

    .corner-2 {
        position: absolute;

        right: 0;
        top: 0;
        width: 20px;
        height: 20px;

        border-width: 4px 4px 0 0;
        border-style: solid;
        border-color: #61F908;
    }

    .corner-3 {
        position: absolute;

        right: 0;
        bottom: 6px;
        width: 20px;
        height: 20px;

        border-width: 0px 4px 4px 0;
        border-style: solid;
        border-color: #61F908;
    }

    .corner-4 {
        position: absolute;

        left: 0;
        bottom: 6px;
        width: 20px;
        height: 20px;

        border-width: 0px 0px 4px 4px;
        border-style: solid;
        border-color: #61F908;
    }
`